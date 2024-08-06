import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { Link, useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";

import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
  if (!product) {
    return <div>Đang tải...</div>; // hoặc xử lý trường hợp null một cách phù hợp
  }
  const features = [
    { name: 'Xuất sứ', description: product.origin },
    { name: 'Thành phần hữu cơ', description: product.oganicIngredients },
    { name: 'Thành phần nguyên liệu', description: product.ingredients },
    { name: 'Công dụng', description: product.purpose  },
    { name: 'Hướng dẫn sử dụng', description: product.instructions },
    { name: 'Lưu ý', description: product.note },
  ]
  return (
    <div class="bg-white">
    <div class="mx-auto grid max-w-2xl grid-cols-1  gap-x-8 gap-y-16 px-4 py-12 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="p-5 bg-green-50">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl p-3">{product.title}</h1>
        <div class="grid grid-cols-2 grid-rows-1 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={product.images[0]}
            alt="Image 1"
            class="rounded-lg bg-gray-100"
          />
          <img
            src={product.images[1]}
            alt="Image 2"
            class="rounded-lg bg-gray-100"
          />
        </div>
        <h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-xl mt-8">Thông tin chi tiết</h2>
        <p class="mt-4 text-gray-500">
          {product.description}
        </p>
  
        <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} class="border-t border-gray-200 pt-4">
              <dt class="font-medium text-gray-900">{feature.name}</dt>
              <dd class="mt-2 text-sm text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="p-4 items-center ">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Giá sản phẩm
        </h1>
        <h2 className="sr-only">Thông tin sản phẩm</h2>
        <p className="text-xl line-through tracking-tight text-gray-500">
          {product.price}.000 VND
        </p>
        <p className="text-3xl tracking-tight text-gray-900">
        {Math.round(product.price*(1-product.discountPercentage/100))}.000 VND
        </p>
  
        {/* Reviews */}
        <div className="mt-6">
          <h3 className="sr-only">Đánh giá</h3>
          <div className="flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    product.rating > rating
                      ? "text-gray-900"
                      : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">{product.rating} out of 5 stars</p>
          </div>
        </div>
  
        <form className="mt-10">
          <button
            onClick={handleCart}
            type="submit"
            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Thêm vào giỏ hàng 
          </button>
        </form>
      </div>
    </div>
  </div>
  

  );
}
