const photos = document.querySelectorAll(".about .container .photo");

photos.forEach(photo => {

    const overlay = photo.querySelector(".overlay");
    const icons = photo.querySelectorAll(".overlay ul li");

    let timers = [];
    let hideTimers = [];

    const iconDelay = 700;
    const iconDuration = 800;
    const overlayDuration = 1200;

    photo.addEventListener("mouseenter", () => {

        timers.forEach(timer => clearTimeout(timer));
        hideTimers.forEach(timer => clearTimeout(timer));

        timers = [];
        hideTimers = [];

        overlay.style.transition = `${overlayDuration}ms ease`;
        overlay.style.top = "0";

        icons.forEach((icon, index) => {

            const timer = setTimeout(() => {

                if (photo.matches(":hover")) {

                    icon.style.transition = `
                        opacity ${iconDuration}ms ease,
                        transform ${iconDuration}ms ease
                    `;
                                    
                    icon.style.visibility = "visible";
                                    
                    setTimeout(() => {
                        icon.style.opacity = "1";
                        icon.style.transform = "translateY(0)";
                    }, 10);

                }

            }, 800 + (index * iconDelay));

            timers.push(timer);
        });

    });

    photo.addEventListener("mouseleave", () => {

        timers.forEach(timer => clearTimeout(timer));

        timers = [];

        const visibleIcons = [];

        icons.forEach(icon => {

            if (getComputedStyle(icon).visibility === "visible") {
                visibleIcons.push(icon);
            }

        });

        visibleIcons.reverse().forEach((icon, index) => {

            const timer = setTimeout(() => {

                icon.style.transition = `
                    opacity ${iconDuration}ms ease,
                    transform ${iconDuration}ms ease,
                    visibility ${iconDuration}ms ease
                `;

                icon.style.opacity = "0";
                icon.style.transform = "translateY(-20px)";
                icon.style.visibility = "hidden";

            }, index * iconDelay);

            hideTimers.push(timer);
        });

        const overlayDelay =
            visibleIcons.length * iconDelay;

        const overlayTimer = setTimeout(() => {

            overlay.style.transition = `${overlayDuration}ms ease`;
            overlay.style.top = "100%";

        }, overlayDelay);

        hideTimers.push(overlayTimer);

    });

});


// PORTFOLIO SECTION

const portfolioItems = document.querySelectorAll(".portfolio .container .web .item");

portfolioItems.forEach(item => {

    const content = item.querySelector(".content");
    const elements = [
        content,
        content.querySelector("h3"),
        content.querySelector("a")
    ];

    let showTimers = [];
    let hideTimers = [];

    const stepDelay = 700;
    const overlayDuration = 1000;

    item.addEventListener("mouseenter", () => {

        showTimers.forEach(t => clearTimeout(t));
        hideTimers.forEach(t => clearTimeout(t));
        showTimers = [];
        hideTimers = [];

        elements.forEach((el, index) => {

            const timer = setTimeout(() => {

                if (item.matches(":hover")) {
                    el.classList.add("active");
                }

            }, index * stepDelay);

            showTimers.push(timer);
        });

    });

    item.addEventListener("mouseleave", () => {

        showTimers.forEach(t => clearTimeout(t));
        showTimers = [];

        const visibleOrder = [];

        elements.forEach((el, index) => {
            if (el.classList.contains("active")) {
                visibleOrder.push({ el, index });
            }
        });

        const reversed = [...visibleOrder].reverse();

        reversed.forEach((itemInfo, i) => {

            const timer = setTimeout(() => {
                itemInfo.el.classList.remove("active");
            }, i * stepDelay);

            hideTimers.push(timer);
        });

    });

});
