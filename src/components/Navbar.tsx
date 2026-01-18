import { Link} from '@tanstack/react-router'

export const Navbar = () => {
    return (
        <div className="p-2 flex gap-2 items-center justify-center">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/homepage" className="[&.active]:font-bold">
        HomePage
      </Link>
    </div>
    )
}

export default Navbar;