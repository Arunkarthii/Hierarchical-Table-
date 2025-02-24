export const calculateParentValue = (children) => {
    return children ? children.reduce((sum, child) => sum + child.value, 0) : 0;
};
