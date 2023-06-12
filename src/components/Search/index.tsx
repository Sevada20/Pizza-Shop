import React, { useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filter/slice";
import { RootState } from "../../redux/store";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );
  const refInput = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    refInput.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={refInput}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="search pizza"
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 19.84"
        >
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
