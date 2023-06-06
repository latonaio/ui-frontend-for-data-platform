import cookie from 'js-cookie';
import { ProductInfo, BarcodeImage, form, ProductImage, UserTypeEnum } from '@/constants';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { env } from '@/helpers/env';

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: form.cookie.expires.days,
      path: '/',
    });
  }
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key: string, req: IncomingMessage & { cookies: NextApiRequestCookies }) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  if (process.browser) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(JSON.parse(value)) : null;
  }

  return null;
};

export const removeLocalStorage = (key: string) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const generateBarcodeImageUrl = (barcode: BarcodeImage) => {
  const fileExtension = 'png'

  return `${env.nest.host}:` +
    `${env.nest.port}/barcode/${barcode.BarcodeType}/${barcode.Id}.${fileExtension}`;
};

export const generateImageProductUrl = (businessPartner: string | null, productImage: ProductImage) => {
  return `${env.nest.host}:` +
    `${env.nest.port}/doc/${businessPartner}/${productImage.DocID}.${productImage.FileExtension}`;
};

export const generateImageEquipmentUrl = (businessPartner: string | null, productImage: ProductImage) => {
  return `${env.nest.host}:` +
    `${env.nest.port}/doc/${businessPartner}/${productImage.DocID}.${productImage.FileExtension}`;
};

export const productInfoReduce = (productInfo: ProductInfo[]) => {
  return productInfo.reduce((collection: any, product: ProductInfo) => {
    if (typeof product.Value === 'object' && product.KeyName === 'Price') {
      collection.push({
        KeyName: product.KeyName,
        Key: product.Key,
        Value : `本体価格 ${Number(product.Value?.NetAmount).toLocaleString()} ` +
          `${product.Value.PriceUnitQty}` +
          `（税込 ${Number(product.Value.GrossAmount).toLocaleString()} ` +
          `${product.Value.PriceUnitQty}）`
      })
    } else if (typeof product.Value === 'object' && product.KeyName === 'InternalCapacityQuantity') {
      collection.push({
        KeyName: product.KeyName,
        Key: product.Key,
        Value : `${product.Value.InternalCapacityQuantity}/${product.Value.InternalCapacityQuantityUnit}`
      })
    } else if (typeof Array.isArray(product.Value) && product.KeyName === 'Material') {
      collection.push({
        KeyName: product.KeyName,
        Key: product.Key,
        Value : product.Value.join('/')
      })
    } else if (typeof Array.isArray(product.Value) && product.KeyName === 'Allergen') {
      collection.push({
        KeyName: product.KeyName,
        Key: product.Key,
        Value : product.Value,
      })
    } else {
      collection.push({
        KeyName: product.KeyName,
        Key: product.Key,
        Value: product.Value,
      });
    }

    return collection;
  }, []);
}

export const paginationArrow = (paginationList: {}[], indexItemNumber: number, type: string) => {
  const totalPage = paginationList.length;
  const currentPage = paginationList.findIndex((pagination: any) => {
    const itemIndexName = (() => {
      if (type === 'orders') {
        return 'OrderItem';
      } else if (type == 'deliveryDocument') {
        return 'DeliveryDocumentItem';
      } else if (type == 'productionOrder') {
        return 'ProductionOrderItem';
      }

      return '';
    })();

    return pagination[itemIndexName] === indexItemNumber;
  }) + 1;

  const prevPage = paginationList[currentPage - 2];
  const nextPage = paginationList[currentPage];

  return {
    totalPage,
    currentPage,
    prevPage,
    nextPage,
  }
}

export const userTypeHandling = (
  businessPartner: number | unknown = null,
  compare1: { key: string; value: number; },
  compare2: { key: string; value: number; },
) => {
  if (businessPartner === compare1.value) {
    return compare1.key;
  } else if (businessPartner === compare2.value) {
    return compare2.key;
  }

  return ''
}

export const convertSelectDataStructure = (
  defaultValues: any[] = [],
  labelName: string,
  valueName: string,
  isLabelMark: boolean = false,
): {
  label: string | number | unknown;
  showLabel: string | number | unknown;
  value: string | number | unknown;
}[] => {
  if (isLabelMark) {
    return defaultValues.reduce((collection, defaultValue: {[key: string]: any}) => {
      collection.push({
        label: defaultValue.label,
        showLabel: defaultValue.showLabel,
        value: `${defaultValue[valueName]}`,
      });

      return collection;
    }, []);
  }

  return defaultValues.reduce((collection, defaultValue: {[key: string]: any}) => {
    collection.push({
      label: defaultValue[labelName],
      value: defaultValue[valueName],
    });

    return collection;
  }, []);
}

export const toLowerCase = (value: string) => {
  return value.replace(/^./g, (g) => g[0].toLowerCase());
}

export const toUpperCase = (value: string) => {
  return value.replace(/^./g, (g) => g[0].toUpperCase());
}
