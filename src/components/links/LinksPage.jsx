import {
    Box,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import _ from "lodash";
import memoizee from "memoizee";
import React from "react";
import { CSSTransition } from "react-transition-group";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { withConfig } from "../../contexts/ConfigContext";
import CategoryList from "./CategoryList";
import LinkCard from "./LinkCard";
import styles from "./LinksPage.module.scss";

let others = null;

const ANIMATION_CUTOFF = 30;

const parseCategoryIdRaw = memoizee((id, categories) => {
    return _.find(categories, val => val.id === id);
});

const LinksPage = ({ config }) => {
    const { categories, links } = config.status === "ok" ? config.links : {};
    if (others === null) {
        others = _.uniq(
            links
                .filter(
                    link => !_.some(categories, cat => cat.id === link.category)
                )
                .map(link => link.category)
        );
    }

    const parseCategoryId = id => parseCategoryIdRaw(id, categories);

    const [category, setCategory] = React.useState("all");

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const current = links.filter(
        val => category === "all" || val.category === category
    );

    if (config.status !== "ok") return <h1>No config...</h1>;

    return (
        <Grid container>
            <Grid item xs={12} md={4}>
                <CategoryList
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    disableOthers={!others || others.length === 0}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box
                    className={
                        styles.details + (isSmall ? ` ${styles.small}` : "")
                    }
                    boxShadow={0}
                >
                    {links.length <= ANIMATION_CUTOFF ? (
                        <Container className={styles.container + " scroll-bar"}>
                            {links.map(
                                (
                                    { title, external, href, category: cat },
                                    index
                                ) => (
                                    <CSSTransition
                                        key={href}
                                        in={
                                            category === "all" ||
                                            (category === "other"
                                                ? others.includes(cat)
                                                : cat === category)
                                        }
                                        classNames={styles.linkPaper}
                                        // timeout={300}
                                        timeout={index * 20 + 250}
                                        unmountOnExit
                                        appear
                                    >
                                        <LinkCard
                                            title={title}
                                            external={external}
                                            href={href}
                                            style={{
                                                "--t-delay": `${index * 20}ms`,
                                            }}
                                            category={(() => {
                                                let x = parseCategoryId(cat);

                                                return x && x.displayName;
                                            })()}
                                        />
                                    </CSSTransition>
                                )
                            )}
                        </Container>
                    ) : (
                        <AutoSizer>
                            {({ height, width }) => {
                                return (
                                    <List
                                        height={height - 64}
                                        itemCount={current.length}
                                        itemSize={100}
                                        width={width}
                                        style={{
                                            marginTop: 32,
                                            marginBottom: 32,
                                        }}
                                        className={"scroll-bar"}
                                    >
                                        {({ index, style }) => {
                                            const {
                                                title,
                                                external,
                                                href,
                                                category: cat,
                                            } = current[index];

                                            return (
                                                <CSSTransition
                                                    key={href}
                                                    in={
                                                        category === "all" ||
                                                        (category !== "other" &&
                                                            cat === category)
                                                    }
                                                    classNames={
                                                        styles.linkPaper
                                                    }
                                                    timeout={300}
                                                    unmountOnExit
                                                    appear
                                                >
                                                    <div
                                                        style={style}
                                                        className="MuiContainer-root MuiContainer-maxWidthLg"
                                                    >
                                                        <LinkCard
                                                            title={title}
                                                            external={external}
                                                            href={href}
                                                            category={(() => {
                                                                let x = parseCategoryId(
                                                                    cat
                                                                );

                                                                return (
                                                                    x &&
                                                                    x.displayName
                                                                );
                                                            })()}
                                                        />
                                                    </div>
                                                </CSSTransition>
                                            );
                                        }}
                                    </List>
                                );
                            }}
                        </AutoSizer>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default withConfig(LinksPage);
