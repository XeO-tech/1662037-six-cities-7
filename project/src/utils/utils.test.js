import { defineRatingWidth, sortOffers, isEmailAddress, isPassword } from './utils';
import { SortingType } from '../const';

const testOffers = [
  {
    price: 200,
    rating: 4.3,
    title: 'Biggest price',
  },
  {
    price: 150,
    rating: 5,
    title: 'Biggest rating',
  },
  {
    price: 100,
    rating: 3,
    title: 'Lowest price',
  },
  {
    price: 130,
    rating: 2,
    title: 'Lowest rating',
  },
];

const testCorrectEmails = ['123@mail.ru', 'test@1.com'];
const testFaultyEmails = ['1232', 's@', ' ', 'sad@sss', '@fdf.tu'];

const testCorrectPasswords = ['dsd', '   d', '123'];
const testFaultyPasswords = ['', ' ', '   '];

describe('Utils functions: sortOffers', () => {
  it('should return array with "Biggest price" in first element and "Lowest price" in last when sort by price descending', () => {

    expect(sortOffers(SortingType.PRICE_DESCENDING ,testOffers)[0].title).toEqual('Biggest price');
    expect(sortOffers(SortingType.PRICE_DESCENDING ,testOffers)[3].title).toEqual('Lowest price');
  });

  it('should return array with "Lowest price" in first element and "Biggest price" in last when sort by price ascending', () => {

    expect(sortOffers(SortingType.PRICE_ASCENDING ,testOffers)[0].title).toEqual('Lowest price');
    expect(sortOffers(SortingType.PRICE_ASCENDING ,testOffers)[3].title).toEqual('Biggest price');
  });

  it('should return array with "Biggest rating" in first element and "Lowest rating" in last when sort by rating', () => {

    expect(sortOffers(SortingType.RATING ,testOffers)[0].title).toEqual('Biggest rating');
    expect(sortOffers(SortingType.RATING,testOffers)[3].title).toEqual('Lowest rating');
  });
});
describe('Utils functions: isEmailAdress', () => {

  it('should return true after testing array with correct emails', () => {

    expect(testCorrectEmails.every(isEmailAddress)).toEqual(true);
  });

  it('should return false after testing array with incorrect emails', () => {

    expect(testFaultyEmails.every((element) => !isEmailAddress(element))).toEqual(true);
  });
});

describe('Utils functions: isPassword', () => {

  it('should return true after testing array with correct passwords', () => {

    expect(testCorrectPasswords.every(isPassword)).toEqual(true);
  });

  it('should return false after testing array with incorrect passwords', () => {

    expect(testFaultyPasswords.every((element) => !isPassword(element))).toEqual(true);
  });
});

describe('Utils functions: defineRatingWidth', () => {

  it('should return "80%" on rating more or equal 4 but less than 5', () => {
    expect(defineRatingWidth(4)).toEqual('80%');
    expect(defineRatingWidth(4.3)).toEqual('80%');
  });

  it('should return "100%" on rating more or equal 5', () => {
    expect(defineRatingWidth(5)).toEqual('100%');
    expect(defineRatingWidth(5.7)).toEqual('100%');
    expect(defineRatingWidth(637)).toEqual('100%');
  });

  it('should return "0%" if rating is undefined or equal or less than 0', () => {
    expect(defineRatingWidth(0)).toEqual('0%');
    expect(defineRatingWidth(-6)).toEqual('0%');
    expect(defineRatingWidth(undefined)).toEqual('0%');
  });
});
