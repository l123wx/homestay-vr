<template>
  <NavBar :is-collect="homestayData?.isCollect == 1" @collect-btn-click="onCollectBtnClick" />
  <div class="banner" @click="toPanoramaViewPage()">
    <img :src="homestayData?.bannerPath" />
    <div class="panoramaIcon">
      <img src="@/assets/images/720°.png" />
    </div>
  </div>
  <div class="info-cell title">
    <div class="description">{{ homestayData?.buildingType || '' }}·{{ homestayData?.houseType || '' }}·{{ homestayData?.toilet?.type || ''}}</div>
    <div class="title">{{ homestayData?.homestayName }}</div>
    <div class="price">￥{{ homestayData?.price }}</div>
  </div>
  <div class="info-cell detail">
    <div class="cell-title">房源信息</div>
    <ul>
      <li>
        <img src="@/assets/images/icon-home.png" />
        <div>{{ homestayData?.roomerInfo?.roomNumber || 0 }}间卧室</div>
      </li>
      <li>
        <img src="@/assets/images/icon-bed.png" />
        <div>{{ homestayData?.roomerInfo?.bedNumber || 0 }}张床</div>
      </li>
      <li>
        <img src="@/assets/images/icon-toilet.png" />
        <div>{{ homestayData?.toilet?.number || 0}}个卫生间</div>
      </li>
      <li>
        <img src="@/assets/images/icon-people.png" />
        <div>宜住{{ homestayData?.roomerInfo?.peopleNumber || 0 }}人</div>
      </li>
    </ul>
  </div>
  <div class="info-cell address">
    <div class="cell-title">
      房源位置
    </div>
    <div class="address-detail">
      <div class="content">{{ homestayData?.address?.text.replaceAll('/', '·') + '·' + homestayData?.address?.detail}}</div>
      <div class="copy-btn" @click="copyAddress">复制地址</div>
    </div>
  </div>
  <div class="info-cell services">
    <div class="cell-title">设施/服务</div>
    <div class="container">
      <img src="@/assets/images/homestay-services.jpg" />
    </div>
  </div>
  <div class="info-cell landlord-info">
    <div class="info-content">
      <div>
        <Avatar :width="50" :height="50" :path="homestayData?.landlordInfo?.avatarPath || ''"/>
        <div>
          <div class="name">{{ homestayData?.landlordInfo?.name }}</div>
        </div>
      </div>
      <div class="contact-btn" @click="contactLandlord">
        <Icon name="chat" size="18px"/>
        联系房东
      </div>
    </div>
    <div class="evaluate">
      <div class="desc">超赞房东经验丰富、评分很高，致力于为房客提供优质的住宿</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from '@/components/HomestayDetail/NavBar.vue'
  import { getPlaceholderImg } from '@/utils/index';
  import Avatar from '@/components/Avatar.vue'
  import { Icon, Notify } from 'vant'
  import { useRouter } from 'vue-router'
  import { inject, Ref, ref } from 'vue';
  import type { HomestayData } from '@/types/homestay'
  const router = useRouter()
  const { showLoading, hideLoading }: any = inject('loadingOperation')

  // 房源数据
  const homestayData = ref<HomestayData>()
  function loadHomestayData() {
    getHomestayDataRequest().then((res:any) => {
      homestayData.value = res.data
    })
  }
  loadHomestayData()
  function getHomestayDataRequest() {
    showLoading()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            bannerPath: require('@/assets/images/homestay-banner.png'),
            isCollect: 0,
            buildingType: '城市民宿',
            houseType: '住宅',
            homestayName: '有家民宿',
            price: '100',
            roomerInfo: {
              peopleNumber: '1',
              roomNumber: '1',
              bedNumber: '1'
            },
            address: {
              text: '广东省/韶关市/新丰县',
              value: '440233',
              detail: 'xx街道xx号'
            },
            toilet: {
              number: '1',
              type: '独立卫生间'
            },
            servicesList: [],
            landlordInfo: {
              avatarPath: getPlaceholderImg(50, 50),
              name: '陈先生',
              phone: ''
            }
          }
        })
        hideLoading()
      }, 500)
    })
  }

  function onCollectBtnClick() {
    if (homestayData.value?.isCollect === undefined) return
    homestayData.value.isCollect = (homestayData.value.isCollect == 1 ? 0 : 1)
  }

  function copyAddress() {
    Notify({
      type: 'success',
      message: '地址已复制到剪贴板'
    })
  }

  function contactLandlord() {
    Notify({
      type: 'success',
      message: '房东电话已复制到剪贴板'
    })
  }

  function toPanoramaViewPage() {
    router.push({
      name: 'panoramaView'
    })
  }
</script>
<style scoped lang="less">
  @spacing-both-end: 15px;
  .banner {
    height: 250px;
    width: 100%;
    position: relative;
    &>img {
      height: 100%;
      width: 100%;
    }
    .panoramaIcon {
      width: 70px;
      height: 70px;
      .absolute-center();
      border-radius: 50%;
      padding: 19px 15px 10px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.3);
      img {
        width: 100%;
      }
    }
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
      .price {
        font-weight: bold;
        padding-top: 4px;
        &::after {
          content: ' / 晚';
          .font(@color-gray; 12px);
        }
      }
    }
    &.detail {
      ul {
        li {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
          &+li {
            margin-left: 20px;
          }
          img {
            width: 24px;
          }
          div {
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
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
    }
    &.evaluate {

    }
    &.services {
      .container {
        img {
          width: 100%;
        }
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
    display: flex;
    position: sticky;
    bottom: 20px;
    margin: 24px @spacing-both-end 0;
    justify-content: right;
    &>div {
      .shadow();
      height: 70px;
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: @color-white;
    }
    .contact {
      
    }
  }
</style>