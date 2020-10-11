import React from "react";
import { IconButton, Icon } from "@material-ui/core";
import $ from "jquery";
import Image from "./Image";
import styles from "./Gallery.module.scss";

const Gallery = props => {
    const { src = [], loadDelay, disableHoverZoom, ...others } = props;
    const [scrollRightDisabled, setSRD] = React.useState(false);
    const [scrollLeftDisabled, setSLD] = React.useState(false);

    const images = React.createRef();

    const updateScrollDisabled = React.useCallback(() => {
        if (images && images.current) {
            const currentLeft = $(images.current).scrollLeft();
            let sld = null;
            let srd = null;

            if (currentLeft <= 0 && !scrollLeftDisabled) {
                sld = true;
            } else if (currentLeft > 0 && scrollLeftDisabled) {
                sld = false;
            }
            if (
                currentLeft + images.current.clientWidth >=
                    images.current.scrollWidth &&
                !scrollRightDisabled
            ) {
                srd = true;
            } else if (
                currentLeft + images.current.clientWidth <
                    images.current.scrollWidth &&
                scrollRightDisabled
            ) {
                srd = false;
            }

            if (sld !== null) {
                setSLD(sld);
            }
            if (srd !== null) {
                setSRD(srd);
            }
        }
    }, [scrollRightDisabled, scrollLeftDisabled, images]);

    React.useEffect(() => {
        updateScrollDisabled();
        $(window).on("resize.gallery-scroll-check", () => {
            updateScrollDisabled();
        });

        let current = null;
        if (images.current) {
            current = images.current;
            $(current).on("scroll.gallery-scroll", () =>
                updateScrollDisabled()
            );
        }

        return () => {
            $(window).off("resize.gallery-scroll-check");
            if (current) {
                $(current).off("scroll.gallery-scroll");
            }
        };
    }, [images, scrollLeftDisabled, scrollRightDisabled, updateScrollDisabled]);

    const renderImages = () => {
        return src.map(image => (
            <Image
                loadDelay={loadDelay}
                src={image.url}
                key={image.url}
                caption={image.caption}
                alt=""
                disableHoverZoom={disableHoverZoom}
            />
        ));
    };

    const scrollLeft = () => {
        if (!images.current) return;
        const imageList = $(images.current);

        const currentLeft = imageList.scrollLeft();

        imageList.animate(
            {
                scrollLeft: currentLeft - 355 < 0 ? 0 : currentLeft - 355,
            },
            100,
            "swing",
            () => {
                updateScrollDisabled();
            }
        );
    };

    const scrollRight = () => {
        if (!images.current) return;
        const imageList = $(images.current);

        const currentLeft = imageList.scrollLeft();

        imageList.animate(
            {
                scrollLeft: currentLeft + 355,
            },
            100,
            "swing",
            () => {
                updateScrollDisabled();
            }
        );
    };

    return (
        <div className={styles.wrapper}>
            <IconButton
                className={`${styles.button} ${
                    styles.buttonLeft
                } ${scrollLeftDisabled && "disabled"}`}
                color="secondary"
                disabled={scrollLeftDisabled}
                onClick={scrollLeft}
            >
                <Icon>chevron_left</Icon>
            </IconButton>
            <div {...others} className={styles.images} id="test" ref={images}>
                {renderImages()}
            </div>
            <IconButton
                className={`${styles.button} ${
                    styles.buttonRight
                } ${scrollRightDisabled && "disabled"}`}
                color="secondary"
                disabled={scrollRightDisabled}
                onClick={scrollRight}
            >
                <Icon>chevron_right</Icon>
            </IconButton>
        </div>
    );
};

export default Gallery;
