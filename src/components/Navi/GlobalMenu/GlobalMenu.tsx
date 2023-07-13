import { clsx } from 'clsx';
import {
  GlobalMenu as Root,
} from './GlobalMenu.style';
import Link from 'next/link';
import React from 'react';

interface GlobalMenuProps {
  className?: string;
}

export const GlobalMenu = ({ className }: {
  className?: string;
}) => {
  return (
    <Root className={clsx(
      `GlobalMenu home`,
      className
    )}>
      <ul>
        <li>
          <Link
            className={'listLink'}
            href="/orders/list"
          >
            <div className={'titleImg'}><img src="order-list.png"/></div>
            <div className={'title'}>オーダー一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/delivery-document/list"
          >
            <div className={'titleImg'}><img src="delivery-document-list.png"/></div>
            <div className={'title'}>入出荷一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'listLink'}
            href="/invoice-document/list"
          >
            <div className={'titleImg'}><img src="invoice-document.png"/></div>
            <div className={'title'}>請求一覧</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/product/list"
          >
            <div className={'titleImg'}><img src="product-list.png"/></div>
            <div className={'title'}>品目一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'listLink'}
            href="/supply-chain-relationship/list"
          >
            <div className={'titleImg'}><img src="scr-list.png"/></div>
            <div className={'title'}>SCR一覧</div>
          </Link>
        </li>

        <li>
           <Link
            className={'listLink'}
            href="/bill-of-material/list"
           >
             <div className={'titleImg'}><img src="bill-of-material-list.png"/></div>
            <div className={'title'}>部品表一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'listLink'}
            href="/operations/list"
          >
            <div className={'titleImg'}><img src="operations-list.png"/></div>
            <div className={'title'}>作業手順一覧</div>
          </Link>
        </li>


        <li>
          <Link
            className={'listLink'}
            href="/production-version/list"
          >
            <div className={'titleImg'}><img src="production-version-list.png"/></div>
            <div className={'title'}>製造バージョン一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'listLink'}
            href="/production-order/list"
          >
            <div className={'titleImg'}><img src="production-order-list.png"/></div>
            <div className={'title'}>製造指図一覧</div>
          </Link>
        </li>

        <li>
          <Link
            className={'listLink'}
            href="/business-partner/list"
          >
            <div className={'titleImg'}><img src="business-partner-list.png"/></div>
            <div className={'title'}>BP一覧</div>
          </Link>
        </li>

        <li>
         <Link
           className={'listLink'}
           href="/equipment/list"
         >
           <div className={'titleImg'}><img src="equipment-list.png"/></div>
           <div className={'title'}>設備一覧</div>
         </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/price-master/list"
          >
            <div className={'titleImg'}><img src="price-list.png"/></div>
            <div className={'title'}>価格一覧</div>
          </Link>
        </li>


        <li>
          <Link
           className={'listLink'}
           href="/work-center/list"
          >
            <div className={'titleImg'}><img src="work-center-list.png"/></div>
           <div className={'title'}>ワークセンタ一覧</div>
         </Link>
        </li>


        {/* <li>
          <Link
            className={'listLink'}
            href="/orders/create"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>オーダー作成（CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/orders/create/edi"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>注文（中小企業EDI CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/orders/create/edi/voluntary-chain"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>注文（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/orders/create/edi/voluntary-chain/answer"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>注文回答（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li> */}

        {/* 入出荷 */}


        {/* <li>
          <Link
            className={'listLink'}
            href="/delivery-document/create"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>入出荷作成（CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/delivery-document/create/edi"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>出荷案内（中小企業EDI CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/delivery-document/create/edi/voluntary-chain"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>出荷案内（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li>
        <li>
          <Link
            className={'listLink'}
            href="/delivery-document/create/edi/voluntary-chain/answer"
          >
            <div className={'titleImg'}><img src="header-girl.png"/></div>
            <div className={'title'}>仕入明細（中小企業EDI 業界固有 CSV入力）</div>
          </Link>
        </li> */}

        {/* <li>
         <Link
           className={'listLink'}
           href="/orders/list"
         >
           <div className={'titleImg'}><img src="orders-list.png"/></div>
           <div className={'title'}>価格一覧</div>
         </Link>
        </li> */}


        {/* <li> */}
        {/*  <Link*/}
        {/*    className={'listLink'}*/}
        {/*    href="/orders/list"*/}
        {/*  >*/}
        {/*    <div className={'titleImg'}><img src="header-girl.png"/></div>*/}
        {/*    <div className={'title'}>住所一覧</div>*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Link*/}
        {/*    className={'listLink'}*/}
        {/*    href="/orders/list"*/}
        {/*  >*/}
        {/*    <div className={'titleImg'}><img src="header-girl.png"/></div>*/}
        {/*    <div className={'title'}>在庫一覧</div>*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Link*/}
        {/*    className={'listLink'}*/}
        {/*    href="/orders/list"*/}
        {/*  >*/}
        {/*    <div className={'titleImg'}><img src="header-girl.png"/></div>*/}
        {/*    <div className={'title'}>見積一覧</div>*/}
        {/*  </Link>*/}
        {/*</li>*/}

        {/*<li>*/}
        {/*  <Link*/}
        {/*    className={'listLink'}*/}
        {/*    href="/orders/list"*/}
        {/*  >*/}
        {/*    <div className={'titleImg'}><img src="header-girl.png"/></div>*/}
        {/*    <div className={'title'}>住所一覧</div>*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Link*/}
        {/*    className={'listLink'}*/}
        {/*    href="/orders/list"*/}
        {/*  >*/}
        {/*    <div className={'titleImg'}><img src="header-girl.png"/></div>*/}
        {/*    <div className={'title'}>金融機関一覧</div>*/}
        {/*  </Link>*/}
        {/*</li>*/}
      </ul>
    </Root>
  );
}
