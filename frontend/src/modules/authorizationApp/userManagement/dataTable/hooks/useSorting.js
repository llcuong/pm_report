const useSorting = () => {
  const onSort = (attribute, value) => {
    console.log(attribute, value)
  };

  return {
    onSort,
  };
};

export default useSorting;