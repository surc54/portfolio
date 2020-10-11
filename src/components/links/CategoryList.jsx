import {
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import React from "react";
import styles from "./LinksPage.module.scss";

const CategoryListItem = ({
    title,
    subtitle,
    category,
    currentCategory,
    setCategory,
}) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <ListItem
            button
            selected={category === currentCategory}
            onClick={() => setCategory(category)}
            className={styles.categoryListItem + (isSmall ? " small" : "")}
            classes={{ selected: styles.selected }}
        >
            <ListItemText primary={title} secondary={subtitle} />
        </ListItem>
    );
};

const CategoryPicker = ({
    categories,
    category,
    setCategory,
    className,
    disableOthers = false,
    ...others
}) => {
    const selectLabel = React.createRef();
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(selectLabel.current.offsetWidth);
        // eslint-disable-next-line
    }, []);

    return (
        <div
            className={
                styles.pickerWrapper + (className ? ` ${className}` : "")
            }
            {...others}
        >
            <FormControl variant="outlined" fullWidth>
                <InputLabel ref={selectLabel} htmlFor="category-select">
                    Category
                </InputLabel>
                <Select
                    fullWidth
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: "category",
                        id: "category-select",
                    }}
                >
                    <MenuItem value="all">All</MenuItem>
                    {categories.map(({ displayName, id, subtitle }) => (
                        <MenuItem key={id} value={id}>
                            {displayName}
                        </MenuItem>
                    ))}
                    {!disableOthers && <MenuItem value="other">Other</MenuItem>}
                </Select>
            </FormControl>
        </div>
    );
};

const CategoryList = ({
    categories,
    category,
    setCategory,
    disableOthers = false,
}) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className={styles.categories}>
            {isSmall ? (
                <CategoryPicker
                    className="spacer"
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    disableOthers={disableOthers}
                />
            ) : (
                <>
                    <Typography variant="h3" className={styles.listName}>
                        Categories
                    </Typography>
                    <List className={styles.categoryList}>
                        <CategoryListItem
                            title="All"
                            category="all"
                            currentCategory={category}
                            setCategory={setCategory}
                        />
                        {categories.map(({ displayName, id, subtitle }) => (
                            <CategoryListItem
                                key={id}
                                title={displayName}
                                subtitle={subtitle}
                                category={id}
                                currentCategory={category}
                                setCategory={setCategory}
                            />
                        ))}
                        {!disableOthers && (
                            <CategoryListItem
                                title="Other"
                                category="other"
                                currentCategory={category}
                                setCategory={setCategory}
                            />
                        )}
                    </List>
                </>
            )}
        </div>
    );
};

export default CategoryList;
