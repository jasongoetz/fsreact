
const images = ['um_psu_stack.jpg', 'stmifb.jpg', 'seafb.jpg', 'pudfb.jpg', 'gibrfb.jpg', 'lsb.jpg', 'bepafb.jpg'];

export const getRandomImageUrl = () => {
    return 'url(/images/' + images[Math.floor(Math.random() * images.length)] + ')'
};
