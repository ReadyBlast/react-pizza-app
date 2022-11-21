import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.emoji}>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует среди нашего ассортимента
        чудесных пицц
      </p>
    </div>
  );
};

export default NotFoundBlock;
