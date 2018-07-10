function observeMouseDrag(dom, {onChange}) {
    const getELoc = (e) => {
        let rect = dom.getBoundingClientRect();
        let x = e.pageX - rect.x;
        let y = e.pageY - rect.y;

        return {x, y};
    };

    dom.addEventListener('mousedown', (e) => {
        const startLoc = getELoc(e);

        onChange({
            x: startLoc.x,
            y: startLoc.y,
        });

        function change(e) {
            const newLoc = getELoc(e);
            const delta = {x: newLoc.x - startLoc.x, y: newLoc.y - startLoc.y};

            onChange({
                x: startLoc.x + delta.x,
                y: startLoc.y + delta.y,
            });
        }
        function finish() {
            window.removeEventListener('mousemove', change);
            window.removeEventListener('mouseup', finish);
        }

        window.addEventListener('mousemove', change);
        window.addEventListener('mouseup', finish);
    });
}

export {observeMouseDrag}