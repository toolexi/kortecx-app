"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { AiFillQuestionCircle } from "react-icons/ai";
import kortecxLogo from '../assets/kortecx_icon.png';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function InteractiveDots() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
        }
        window.addEventListener("mousemove", updateMousePosition)
        return () => window.removeEventListener("mousemove", updateMousePosition)
    }, [])

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setDimensions({ width: rect.width, height: rect.height })
            }
        }
        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    interface DotProps {
        homeX: number
        homeY: number
        size: number
        color: string
        emoji: string
    }

    const Dot = ({ homeX, homeY, size, color, emoji }: DotProps) => {
        const displaceX = useTransform([mouseX, mouseY], (values: number[]) => {
            const mx = values[0]!
            const my = values[1]!
            const dx = mx - homeX
            const dy = my - homeY
            const dist = Math.hypot(dx, dy)
            const maxDist = 150
            if (dist > maxDist || dist === 0) return 0
            const force = (maxDist - dist) / maxDist
            return - (dx / dist) * force * 50 // repel
        })
        const displaceY = useTransform([mouseX, mouseY], (values: number[]) => {
            const mx = values[0]!
            const my = values[1]!
            const dx = mx - homeX
            const dy = my - homeY
            const dist = Math.hypot(dx, dy)
            const maxDist = 150
            if (dist > maxDist || dist === 0) return 0
            const force = (maxDist - dist) / maxDist
            return - (dy / dist) * force * 50 // repel
        })
        const scale = useTransform([mouseX, mouseY], (values: number[]) => {
            const mx = values[0]!
            const my = values[1]!
            const dx = mx - homeX
            const dy = my - homeY
            const dist = Math.hypot(dx, dy)
            const maxDist = 100
            if (dist > maxDist) return 1
            const force = (maxDist - dist) / maxDist
            return 1 + force * 1 // max scale 2
        })
        const springX = useSpring(displaceX, { stiffness: 300, damping: 30 })
        const springY = useSpring(displaceY, { stiffness: 300, damping: 30 })
        const springScale = useSpring(scale, { stiffness: 300, damping: 30 })
        const emojiOpacity = useTransform(springScale, [1, 1.5], [0, 1])
        const dotOpacity = useTransform(springScale, [1, 1.5], [1, 0])

        return (
            <motion.div
                className="absolute origin-center"
                style={{
                    left: homeX,
                    top: homeY,
                    width: size,
                    height: size,
                    x: springX,
                    y: springY,
                    scale: springScale,
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full"
                    style={{
                        backgroundColor: color,
                        opacity: dotOpacity,
                    }}
                />
                <motion.span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        fontSize: size * 0.8,
                        opacity: emojiOpacity,
                    }}
                >
                    {emoji}
                </motion.span>
            </motion.div>
        )
    }

    const { width, height } = dimensions

    const emojisList = ["🤖", "🔄", "📊", "🚀", "🧠", "💡", "⚙️", "➗", "📐", "🔢", "📚", "🛠️", "🔧", "🏗️"]
    const dotEmojis = useMemo(() => Array.from({ length: 256 }).map(() => emojisList[Math.floor(Math.random() * emojisList.length)]), [])

    const tinyDots = Array.from({ length: 256 }).map((_, i) => {
        const col = i % 16
        const row = Math.floor(i / 16)
        const homeX = (col + 0.5) * (width / 16)
        const homeY = (row + 0.5) * (height / 16)
        return <Dot key={i} homeX={homeX} homeY={homeY} size={8} color="#FC7826" emoji={dotEmojis[i]} />
    })

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 blur-xs">{tinyDots}</div>
            <div className=" absolute top-4 left-4 text-2xl font-bold flex items-center gap-2">
                <img src={kortecxLogo} alt="Kortecx Logo" className=" w-8 h-8"/>
                Kortecx
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className=" items-center font-bold justify-center text-center bg-black bg-opacity-80 px-8 py-6 rounded-lg shadow-lg text-white">
                    <h2 className=" text-4xl ">Welcome to KortecX</h2>
                    <br />
                    <button>
                        <a href="/homepage" className=" items-center justify-center text-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                            Start Building
                        </a>
                    </button>
                    {/* <a href="/" className=" items-center justify-center text-center ">Enter Workspace</a> */}
                </div>
            </div>
            <div className="absolute bottom-4 right-4 ">
                <a href="https://kortecx.com" target="_blank">
                    <Tooltip>
                        <TooltipTrigger>
                            <AiFillQuestionCircle className=" w-8 h-8"/>
                        </TooltipTrigger>
                        <TooltipContent>
                                {/* <AiFillQuestionCircle className=" w-8 h-8"/> */}
                                Kortecx: learn more about us!
                        </TooltipContent>
                    </Tooltip>
                </a>
                
            </div>
        </div>
    )
}