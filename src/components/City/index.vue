<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in citiesList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in citiesList"
          :key="item.id"
          @touchstart="hotListIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  data() {
    return {
      citiesList: [],
      hotList: [],
      isLoading:true
    };
  },
  created() {
    let citiesList = window.localStorage.getItem('citiesList')
    let hotList = window.localStorage.getItem('hotList')
    if(citiesList && hotList){
      this.citiesList = JSON.parse(citiesList)
      this.hotList = JSON.parse(hotList)
      this.isLoading = false
    }else{
      this.$axios
      .get("/api/cityList")
      .then(res => {
        // console.log(res.data.data)
        if (res.data.msg == "ok") {
          let cities = res.data.data.cities;
          let { citiesList, hotList } = this.cityList(cities);
          this.citiesList = citiesList;
          this.hotList = hotList;
          this.isLoading = false
          //console.log(this.citiesList);
          window.localStorage.setItem('citiesList',JSON.stringify(citiesList))
          window.localStorage.setItem('hotList',JSON.stringify(hotList))
        }
      })
      .catch(err => console.log(err));
    }
    
  },
  methods: {
    cityList(cities) {
      let citiesList = [];
      let hotList = [];
      for (let i = 0; i < cities.length; i++) {
        let fistList = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(fistList)) {
          citiesList.push({
            index: fistList,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          for (let j = 0; j < citiesList.length; j++) {
            if (citiesList[j].index === fistList) {
              citiesList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      citiesList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return +1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          0;
        }
      });
      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      function toCom(fistList) {
        for (let j = 0; j < citiesList.length; j++) {
          if (citiesList[j].index === fistList) {
            return false;
          }
        }
        return true;
      }
      return {
        citiesList,
        hotList
      };
    },
    hotListIndex(index) {
      var hw = this.$refs.city_sort.getElementsByTagName("h2");
      // this.$refs.city_sort.parentNode.scrollTop = hw[index].offsetTop;
      this.$refs.city_list.toScrollTop(-hw[index].offsetTop)
    },
    handleToCity(nm,id){
      this.$store.commit('cityl/CITY_INFO',{nm,id})
      window.localStorage.setItem('nm',nm)
      window.localStorage.setItem('id',id)
      this.$router.push('/movie/playing')
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
