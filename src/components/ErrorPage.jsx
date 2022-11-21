import React from 'react'

const ErrorPage = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Произошла ошибка <b className='icon'>😕</b>
        </h2>
        <p>
          К сожалению, что-то пошло не так и нам не удалось загрузить питсы
          <br />
          Извините за неудобства
        </p>
      </div>
    </div>
  );
}

export default ErrorPage