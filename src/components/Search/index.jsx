import styles from "./Search.module.scss";

const Search = () => {
  return (
    <div>
      <input className={styles.root} placeholder="search pizza" />
    </div>
  );
};
export default Search;
