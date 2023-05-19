import React from "react";

import styles from "./NotFoundBlock.module.css";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span role="img" aria-label="Грустный">
          &#128546;
        </span>
      </h1>
      <br />
      <h1>Nothing found</h1>
      <p className={styles.description}>
        Sorry, this page is not available in our online store.
      </p>
    </div>
  );
};

export default NotFoundBlock;
