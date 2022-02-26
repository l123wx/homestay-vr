<template>
  <NavBar />
  <ImgBanner class="banner" />
  <div class="info-cell title">
    <div class="description">整套公寓型住宅 · 1室1卫1床 · 可住2人</div>
    <div class="title">民宿名称名宿名称名宿名称民宿名称民宿名...</div>
    <TabList class="tab-list" :plain="true" :tabList="tabList"/>
    <div class="time">
      <div>
        <span class="begin">2月10日</span>
        <span class="end">2月10日</span>
      </div>
      <span class="amount">
        共一晚
        <Icon name="arrow" />
      </span>
    </div>
  </div>
  <div class="info-cell detail">
    <div class="cell-title">房源信息</div>
  </div>
  <div class="info-cell address">
    <div class="cell-title">
      位置周边
      <div>
        地图 / 周边
        <Icon name="arrow" />
      </div>
    </div>
    <div class="address-detail">
      <div class="content">广东·广州·天河区·大观路·距你所在位置1.8km</div>
      <div class="copy-btn">复制地址</div>
    </div>
    <div class="map-container">
      
    </div>
  </div>
  <div class="info-cell evaluate">
    <div class="cell-title">房客评价</div>
  </div>
  <div class="info-cell services">
    <div class="cell-title">设施/服务</div>
    <div class="container">
      <img src="@/assets/images/homestay-services.jpg" />
    </div>
    <div class="more-btn">查看更多</div>
  </div>
  <div class="info-cell landlord-info">
    <div class="info-content">
      <div>
        <Avatar :width="50" :height="50"/>
        <div>
          <div class="name">房东昵称</div>
        </div>
      </div>
      <div class="contact-btn">
        <Icon name="chat" size="18px"/>
        联系房东
      </div>
    </div>
    <div class="evaluate">
      <div class="desc">超赞房东经验丰富、评分很高，致力于为房客提供优质的住宿</div>
      <div class="detail">
        <div>
          <div>平均分</div>
          <div data-unit="分">4.8</div>
          <div>187条评价</div>
        </div>
        <div>
          <div>24小时回复率</div>
          <div data-unit="%">87</div>
          <div>评均1分钟内回复</div>
        </div>
        <div>
          <div>订单确认率</div>
          <div data-unit="%">100</div>
          <div>最近已接94单</div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-nav">
    <div class="contact">
      <Avatar :width="30" :height="30" />
      <div>联系房东</div>
    </div>
    <div class="time">
      <div>02/19入住</div>
      <div>02/19离开</div>
    </div>
    <div class="reserve-btn">
      <div class="price">111.13</div>
      预定
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from '@/components/HomestayDetail/NavBar.vue'
  import TabList from '@/components/TabList.vue'
  import ImgBanner from '@/components/ImgBanner.vue'
  import Avatar from '@/components/Avatar.vue'
  import { Icon } from 'vant'
  const tabList = [
    {
      title: '景点1',
      value: 0
    }, {
      title: '景点2',
      value: 2
    }, 
  ]
</script>
<style scoped lang="less">
  @spacing-both-end: 15px;
  .banner {
    height: 250px;
    width: 100%;
  }
  .info-cell {
    padding: @spacing-both-end;
    &+.info-cell {
      border-top: 8px solid @color-light-gray-1;
    }
    .cell-title {
      font-weight: bold;
    }
    &.title {
      .description {
        font-size: 13px;
      }
      .title {
        margin-top: 4px;
        font-weight: bold;
      }
      .tab-list {
        margin-top: 6px;
      }
      .time {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid @color-light-gray-1;
        padding: 8px 0 2px;
        margin-top: 10px;
        div {
          span {
            font-size: 14px;
            &::after {
              font-size: 10px;
            }
          }
          .begin::after {
            content: '入住'
          }
          .end {
            position: relative;
            padding-left: 10px;
            margin-left: 10px;
            &::before {
              .kerley(120%)
            }
            &::after {
              content: '离开'
            }
          }
        }
        .amount {
          font-size: 14px;
        }
      }
    }
    &.detail {

    }
    &.address {
      .cell-title {
        position: relative;
        div {
          .font(@color-blue; 12px; normal);
          .absolute-center(false; true);
          right: 0;
        }
      }
      .address-detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        .content {
          .font(@color-gray; 12px);
        }
        .copy-btn {
          border: 1px solid @color-light-gray-3;
          border-radius: 15px;
          display: inline-block;
          font-size: 12px;
          padding: 2px 8px;
        }
      }
      .map-container {
        height: 126px;
        border-radius: 5px;
        background-color: @color-light-gray-2;
        margin-top: 10px;
      }
    }
    &.evaluate {

    }
    &.services {
      .container {
        img {
          width: 100%;
        }
      }
      .more-btn {
        font-size: 14px;
        text-decoration: underline;
      }
    }
    &.landlord-info {
      .info-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div:nth-child(1)>div {
          display: inline-block;
          vertical-align: middle;
          &:nth-child(2) {
            margin-left: 10px;
            .name {
              font-weight: bold;
            }
          }
        }
        .contact-btn {
          border: 1px solid @color-black;
          border-radius: 10px;
          padding: 10px 12px;
          font-weight: bold;
        }
      }
      .evaluate {
        margin-top: 15px;
        .desc {
          .font(@color-light-gray-3; 12px);
        }
        .detail {
          border-radius: 5px;
          background-color: @color-light-gray-1;
          margin-top: 15px;
          display: flex;
          &>div {
            .font(@color-gray; 12px);
            flex: 1;
            padding: 12px;
            position: relative;
            &+div::before {
              .kerley(70%);
            }
            &>div:nth-child(2) {
              .font(@color-black; 16px; bold);
              &::after {
                content: attr(data-unit);
                font-size: 10px;
              }
              padding: 4px 0;
            }
          }
        }
      }
    }
  }
  .bottom-nav {
    height: 70px;
    display: flex;
    position: sticky;
    bottom: 20px;
    border-radius: 5px;
    background-color: @color-white;
    margin: 24px @spacing-both-end 0;
    .shadow();
    &>div {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .contact {
      
    }
    .time {
      position: relative;
      &::before {
        .kerley(100%);
      }
    }
    .reserve-btn {
      background-color: @color-purple;
      border-radius: 5px;
      color: @color-white;
      .price {
        &::before {
          content: '￥';
          font-size: 12px;
        }
        &::after {
          content: ' / 晚';
        }
      }
    }
  }
</style>