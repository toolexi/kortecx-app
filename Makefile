start:
	sh scripts/kx_start.sh

clean-start:
	rm -rf ~/Library/Caches/electron
	rm -rf ~/Library/Caches/electron-builder
	rm -rf node_modules package-lock.json
	sh scripts/kx_start.sh