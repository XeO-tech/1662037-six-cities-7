import React, { useState, useRef, useEffect } from 'react';
import { postComment } from '../../store/api-actions';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const MAX_COMMENT_LENGTH = 300;
const MIN_COMMENT_LENGTH = 50;


function CommentForm(props) {
  const {offerId, initReviewsUpdate} = props;

  const defaultFormData = {
    rating:'',
    comment:'',
  };

  const [formData, setFormData] = useState(defaultFormData);

  const dispatch = useDispatch();

  const formRef = useRef();
  const textareaRef = useRef();
  const buttonRef = useRef();

  const formInputs = [];

  const disableForm = () => formInputs.forEach((input) => input.disabled = true);
  const enableForm = () => formInputs.forEach((input) => input.disabled = false);

  const disableSubmitButton = () => buttonRef.current.disabled = true;
  const enableSubmitButton = () => buttonRef.current.disabled = false;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    disableForm();
    disableSubmitButton();

    dispatch(postComment(offerId, formData))
      .then(() => {
        enableForm();
        enableSubmitButton();
        setFormData(defaultFormData);
        formRef.current.reset();
        initReviewsUpdate();
      })
      .catch(() => {
        enableForm();
        enableSubmitButton();
      });
  };

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setFormData(Object.assign({}, formData, {[name]: value}));
  };

  useEffect(() => {
    textareaRef.current.maxLength = MAX_COMMENT_LENGTH;
    textareaRef.current.minLength = MIN_COMMENT_LENGTH;

    formInputs.push(...formRef.current.querySelectorAll('input'));
    formInputs.push(formRef.current.querySelector('textarea'));

    disableSubmitButton();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (formRef.current.checkValidity() && formData.rating !== '') ?
      enableSubmitButton() :
      disableSubmitButton();

  }, [formData]);


  return (
    <form ref={formRef} onSubmit = {handleSubmit} onChange = {handleFieldChange} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value={5} id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value={4} id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value={3} id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value={2} id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" value={1} id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea ref={textareaRef} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" defaultValue={''} required/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button ref={buttonRef} className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  initReviewsUpdate: PropTypes.func.isRequired,
};

export default CommentForm;
