const MAX_INPUT_BYTES = 8 * 1024 * 1024;

export async function fileToAvatarDataUrl(file: File, size = 256): Promise<string> {
    if (!file.type.startsWith('image/')) {
        throw new Error('Please choose an image file (JPG, PNG or WebP).');
    }
    if (file.size > MAX_INPUT_BYTES) {
        throw new Error('That image is too large. Please choose one under 8MB.');
    }

    const objectUrl = URL.createObjectURL(file);
    try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = () => reject(new Error('We could not read that image. Try a JPG or PNG.'));
            el.src = objectUrl;
        });

        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Your browser could not process that image.');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, sx, sy, side, side, 0, 0, size, size);

        return canvas.toDataURL('image/jpeg', 0.85);
    } finally {
        URL.revokeObjectURL(objectUrl);
    }
}