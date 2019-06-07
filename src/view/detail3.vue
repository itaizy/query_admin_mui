<template>
    <div>
        <div class="wrapper">
            <!-- <div class="logo-wrap">
                <span class="logo"></span>
            </div>
            <p class="intro">
                Vue技术栈单页面构建工具
            </p>
            
            <nut-cell :title="selectP" desc="选择考生省份" :showIcon="true" @click.native="openPickerP">
            </nut-cell>
            <nut-cell :title="selectT" desc="选择分科" :showIcon="true" @click.native="openPickerT">
            </nut-cell>
            <nut-textinput 
                v-model="inputS"
                placeholder="请输入分数"
                :clearBtn="true"
                :disabled="false"
            />
            <p class="link">
                <a href="https://github.com/jdf2e/Gaea4" class="btn">
                    GITHUB
                </a>
                <a href="https://www.npmjs.com/package/gaea-cli" class="btn">
                    NPM
                </a>
                <router-link to="" class="btn btn-start" @click.native="clkTag">
                    起步
                </router-link>
            </p> -->
            <h2 style="font-size:0.5rem" justify="center" align="middle" v-for="(or,idx) in srank" :key="idx">
                {{or[0]}}年全省排{{or[1]}}名 &nbsp;
            </h2>
            <p class="intro">
                <font size="3" color="blue">匹配到{{nUniv}}所学校,{{nSp}}个专业,{{nTotal}}条内容</font> 
            </p>
            <nut-infiniteloading 
                @loadmore="onInfinite" 
                :is-show-mod="true" 
                :has-more="isHasMore" 
                :is-loading="isLoading" 
                :threshold="200"
            >
                <nut-cell 
                    :title = "this.inputStext"
                    desc = "最低分|最高分"
                    :showIcon = "false"
                    >
                </nut-cell>
                <!-- <ul class="list" >
                    <li 
                        class="list-item" 
                        v-for="(item, index) of data2" 
                        :key="item"
                    > -->
                    <div class-name="rowc" v-for="(one,idx) in scoreDetail" :key="idx">
                    <!-- <p slot="title">{{one.uname}}</p> -->
                        <!-- {{one.uname}}
                        <p></p>
                        <div style="display:inline">
                        <span>位于{{one.province}}&nbsp;|&nbsp; 全国{{one.nrank}}名 &nbsp;|&nbsp;</span> <span v-if="one.f211==1">211 &nbsp;|&nbsp;</span><span v-if="one.f985==1">985 &nbsp;|&nbsp;</span><span v-if="one.dual_class_name"> {{one.dual_class_name}} &nbsp;|&nbsp; </span>数据：{{one.year}} 年
                        </div> -->
                        <nut-cell 
                        :title = "one.uname" 
                        :subTitle = "one.desc"
                        :showIcon = "true"
                        >
                        <!-- <span>位于{{one.province}}&nbsp;|&nbsp; 全国{{one.nrank}}名 &nbsp;|&nbsp;</span> <span v-if="one.f211==1">211 &nbsp;|&nbsp;</span><span v-if="one.f985==1">985 &nbsp;|&nbsp;</span><span v-if="one.dual_class_name"> {{one.dual_class_name}} &nbsp;|&nbsp; </span>数据：{{one.year}} 年 -->
                        </nut-cell>
                        <!-- <nut-row type="flex" flexWrap="nowrap" :gutter="10">
                            <nut-col :span="14">
                                <div class="flex-content">专业名称</div>
                            </nut-col>
                            <nut-col :span="5">
                                <div class="flex-content flex-content-light">最低</div>
                            </nut-col>
                            <nut-col :span="5">
                                <div class="flex-content flex-content-light">最高</div>
                            </nut-col>
                        </nut-row> -->
                        
                        <!-- <hr style=" height:2px;border:none;border-top:2px dotted #d0d0d0;" /> -->
                        <!-- <div v-for="(oitem,oidx) in one.uscore" :key="oidx" >
                            <nut-row type="flex" flexWrap="nowrap" :gutter="10">
                                <nut-col :span="14">
                                    <div class="flex-content">{{oitem.spname}}</div>
                                </nut-col>
                                <nut-col :span="5">
                                    <div class="flex-content flex-content-light">{{oitem.min}}</div>
                                </nut-col>
                                <nut-col :span="5">
                                    <div class="flex-content flex-content-light">{{oitem.max}}</div>
                                </nut-col>
                            </nut-row>
                            <hr style=" height:2px;border:none;border-top:2px dotted #d0d0d0;" />
                        </div> -->
                        <nut-cell v-for="(oitem,oidx) in one.uscore" :key="oidx" 
                        :title = "oitem.spname" 
                        :desc = "oitem.mms"
                        >
                        </nut-cell>
                        <!-- <hr style="height:1px;border:none;border-top:1px solid #555555;" />  -->
                        <hr style="height:10px;border:none;border-top:10px groove skyblue;" />
                        <!-- <Table type="width=100%" :loading="loading" stripe :columns="columns1" :data="one.uscore"></Table> -->
                    </div>
                    <!-- </li> -->
            </nut-infiniteloading>

            <!-- <nut-picker 
                :is-visible="P_isVisible" 
                title="请选择省份"
                :list-data="listData"
                :default-value-data="defaultValueData"
                @close="switchPicker('P_isVisible')"
                @confirm="setChooseValue"
                @choose="updateChooseValue"
                @close-update="closeUpdateChooseValue"
            >
            </nut-picker>
            <nut-picker 
                :is-visible="T_isVisible" 
                :default-value-data="T_defaultValueData"
                :list-data="T_listData"
                @close="switchPicker('T_isVisible')"
                @confirm="setYearValue"
            >
            </nut-picker> -->
            <!-- <div class="jdc-logo"><s></s></div> -->
            <nut-cell title = "长按关注 查询更多" >
            </nut-cell>
            <img style="width:100%" src="../asset/img/qrcode_for_gh_bd5721f996b8_258.jpg"/>
        </div>
        <!-- <skeleton /> -->
        
    </div>
</template>

<script>
// import { Picker, TextInput, InfiniteLoading, Row, Col } from "@nutui/nutui";
import {InfiniteLoading } from "@nutui/nutui";
import axios from 'axios';
// import skeleton from "../skeleton/skeleton.vue";
export default {
    components: {
        // "nut-picker": Picker,
        // "nut-textinput": TextInput,
        "nut-infiniteloading": InfiniteLoading,
        // "nut-row": Row,
        // "nut-col": Col,
        // skeleton
    },
    data() {
        return {
            P2id: {'河北': 13, '山东': 37},
            T2id: {'理科':1, '文科': 2},
            selectP: '',
            selectT: '',
            inputS: '560',
            inputStext: '560分',
            srank: null,
            P_isVisible: false,
            T_isVisible: false,
            data:{
                '华北': ['河北','北京','天津','山西','内蒙古'],
                '东北': ['辽宁','吉林','黑龙江'],
                '华东': ['山东','上海','江苏','浙江','安徽','福建','江西'],
                '华中': ['河南','湖北','湖南','广东','广西','海南'],
                '西南': ['重庆','四川','贵州','云南','西藏'],
                '西北': ['陕西','甘肃','青海','宁夏','新疆']
            },
            listData: [
                [ '华北', '东北', '华东', '华中', '西南','西北' ]
            ],
            defaultValueData: null,
            T_listData: [['理科', '文科']],
            T_defaultValueData: null,
            data2: new Array(30),
            page: 2,
            num: 30,
            isHasMore: true,
            isLoading: false,
            isErr: false,
            timer: null,
            scoreDetail: null,
            nUniv: 0,
            nSp: 0,
            nTotal: 0
        };
    },
    created() {
        // this.listData = [...[this.listData[0]], this.data[this.listData[0][0]] ];
    },
    mounted() {
        this.setChooseValue(this.$route.query.province.split('-'))
        this.selectT = this.$route.query.local_type
        this.inputS = this.$route.query.score
        this.inputStext = this.inputS + '分'
            // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 40
            // this.tableHeight = window.innerHeight
        axios.get('./serverapi/qqscorefree', { 
            params: { 
                score: Number(this.inputS), 
                local_type_id: this.T2id[this.selectT],
                province_id: this.P2id[this.selectP.split('-')[1]]
                }
            }).then(response => {
            let kp = response.data.data
            // console.log('197:' + kp)
            // console.log('198:' + kp.replace(new RegExp('\'','g'),'"').replace(/-1/g, '\"-\"'))
            this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"').replace(/-1/g, '\"-\"') +'}')['sd']
            this.srank = response.data.srank
            this.counta = 0;
            for (let it in response.data.counts) {
                this.counta = this.counta + it[1]
            }
            this.nUniv = response.data.nuniv
            this.nSp = response.data.nsp
            this.nTotal = response.data.total
            //this.counta = _.sumBy(response.data.counts, function(o) {console.log(o); return o[1]})
            // this.scoreDetail = JSONArray.fromObject(response.data.data);
        })
    },
    destroyed() {
        clearTimeout(this.timer);
    },
    methods: {
        onInfinite () {
            this.isLoading = true;
            this.timer = setTimeout(() => {
                if (this.page <= 3) {
                    this.data2 = new Array(this.num * this.page);
                    this.page = this.page + 1;
                } else {
                    this.isHasMore = false;
                }
                this.isLoading = false;
            }, 100);
        },
        clkTag(){
            this.$router.push({ path: '/detail2', query: {province: this.selectP, local_type: this.selectT, score:this.inputS}});
        },
        switchPicker(param) {
            this[`${param}`] = !this[`${param}`];
        },

        setChooseValue(chooseData) {
            this.selectP = `${chooseData[0]}-${chooseData[1]}${chooseData[2] ? '-' + chooseData[2] : ''}`;
        },

        setYearValue(chooseData) {
            this.selectT = `${chooseData[0]}`;
        },

        updateLinkage(self, value, index, chooseValue, cacheValueData) {
            if (!value) {
                return false;
            }
            switch(index) {
                case 1: 
                    let i = this.listData[0].indexOf(value);
                    this.listData.splice(index, 1, [...this.data[this.listData[0][i]]]);
                    chooseValue = chooseValue ? chooseValue : this.listData[index][0];
                    self && self.updateChooseValue(self, index, chooseValue);
                    this.updateLinkage(self, chooseValue, 2, (cacheValueData && cacheValueData[2] ? cacheValueData[2] : null));
                    // this.selectP = chooseValue;
                    break;
                // case 2: 
                //     let areaData = this.dataSub[value] ? this.dataSub[value] : []; 
                //     this.listData.splice(index, 1, [...areaData]);
                //     chooseValue = chooseValue ? chooseValue : this.listData[index][0];
                //     self && self.updateChooseValue(self, index, chooseValue);
                //     break;
            }
        },

        updateChooseValue(self, index, value, cacheValueData) {
            index < 2 && this.updateLinkage(self, value, (index + 1), null);
        },

        closeUpdateChooseValue(self, chooseData) {
            this.updateLinkage(self, chooseData[0], 1, chooseData[1], chooseData);
        },

        openPickerP(){
            this.P_isVisible = true;
        },
        openPickerT(){
            this.T_isVisible = true;
        },
        modifyYear(){
            this.T_defaultValueData = ['理科'];
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 20px 10px;
    font-size: 12px;
    a {
        color: #333;
    }
}
.intro {
    font-size: 0.36rem;
    line-height: 0.48rem;
    color: #333;
    text-align: center;
}
.link {
    text-align: center;
    padding-top: 1rem;
    .btn {
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.8rem;
        border: 1px solid #da642e;
        display: inline-block;
        padding: 0 0.6rem;
        font-size: 0.28rem;
        color: #da642e;
        margin: 0.2rem;
    }
    .btn-start {
        background: #f1f2f3;
        color: #7f8c8d;
        border: 1px solid #f6f6f6;
    }
}
.logo-wrap {
    text-align: center;
    padding: 20px;
}
.logo {
    background: url("https://img14.360buyimg.com/uba/jfs/t1/14029/6/4518/6382/5c32dd25Ed88527f2/55e60f2080cc6d6b.png")
        0 0 no-repeat;
    display: inline-block;
    width: 72px;
    height: 68px;
    background-size: 100% 100%;
}
.jdc-logo{
    text-align: center;
    margin-top:4rem;
    s{
        display: inline-block;
        height:0.24rem;
        width:1.15rem;
        background:url('../asset/img/logo.png') 0 0 no-repeat;
        background-size:100% 100%;

    }
}
.webp .jdc-logo{
    s{
        background:url('../asset/img/webp/logo.webp') 0 0 no-repeat;
        background-size:100% 100%;
    }
}
.h2 {
    font-size: 1.25rem;
    color: #da642e;
}
</style>
