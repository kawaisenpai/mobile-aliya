import { Injectable } from '@angular/core';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
  router: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { } 

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Anime',
      image: '../../assets/animes.jpg',
      router: '/anime'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Digital Art',
      image: '../../assets/digital.jpeg',
      router: '/digital'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Fan Art',
      image: '../../assets/fans.JPG',
      router: '/fanart'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Food Stickers ',
      price: 8,
      image: '../../assets/pro2.jpg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Night Embroidery',
      price: 12,
      image: '../../assets/pro1.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Device Holder',
      price: 4,
      image: '../../assets/pro5.jpg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Iphone Casing',
      price: 25,
      image: '../../assets/pro6.jpg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Journal Stickers Set',
      price: 34,
      image: '../../assets/jur.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-6.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
}
