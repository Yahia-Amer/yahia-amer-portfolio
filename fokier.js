const photos = document.querySelectorAll(".about .container .photo");

photos.forEach(photo => {

    const overlay = photo.querySelector(".overlay");
    const icons = photo.querySelectorAll(".overlay ul li");

    let timers = [];
    let hideTimers = [];

    const iconDelay = 700;      // الوقت بين كل icon والتاني
    const iconDuration = 800;   // مدة ظهور/اختفاء الـ icon
    const overlayDuration = 1200;


    // =========================
    // MOUSE ENTER
    // =========================

    photo.addEventListener("mouseenter", () => {

        // لو كان فيه animation قديم بيشتغل
        timers.forEach(timer => clearTimeout(timer));
        hideTimers.forEach(timer => clearTimeout(timer));

        timers = [];
        hideTimers = [];


        // Overlay يظهر
        overlay.style.transition = `${overlayDuration}ms ease`;
        overlay.style.top = "0";


        // نظهر الـ icons واحدة واحدة
        icons.forEach((icon, index) => {

            const timer = setTimeout(() => {

                // لو الماوس لسه جوه
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


    // =========================
    // MOUSE LEAVE
    // =========================

    photo.addEventListener("mouseleave", () => {

        // وقف أي icons لسه مستنية تظهر
        timers.forEach(timer => clearTimeout(timer));

        timers = [];


        // نحدد الـ icons اللي ظهرت فعلًا
        const visibleIcons = [];

        icons.forEach(icon => {

            if (getComputedStyle(icon).visibility === "visible") {
                visibleIcons.push(icon);
            }

        });


        // =========================
        // HIDE ICONS IN REVERSE
        // =========================

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


        // =========================
        // HIDE OVERLAY
        // =========================

        const overlayDelay =
            visibleIcons.length * iconDelay;

        const overlayTimer = setTimeout(() => {

            overlay.style.transition = `${overlayDuration}ms ease`;
            overlay.style.top = "100%";

        }, overlayDelay);

        hideTimers.push(overlayTimer);

    });

});


// =========================
// PORTFOLIO SECTION
// =========================

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

    // =========================
    // MOUSE ENTER
    // =========================

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


    // =========================
    // MOUSE LEAVE
    // =========================

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