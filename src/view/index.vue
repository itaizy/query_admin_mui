<template>
    <div>
        <div class="wrapper">
            <div class="logo-wrap">
                <span class="logo"></span>
            </div>
             <p> &nbsp;</p>
            <p class="intro">
                <font size="5" color="red">金状元专业录取线</font> 
            </p>
            <p> &nbsp;</p>
            <p> &nbsp;</p>
            
            <nut-cell :title="selectProvice" desc="选择考生省份" :showIcon="true" @click.native="openPickerP">
            </nut-cell>
            <nut-cell :title="selectType" desc="选择分科" :showIcon="true" @click.native="openPickerT">
            </nut-cell>
            <nut-textinput 
                v-model="inputS"
                placeholder="请输入分数"
                :clearBtn="true"
                :disabled="false"
            />
            <p class="link">
                <!-- <a href="https://github.com/jdf2e/Gaea4" class="btn" @click.native="clkTag">
                    查询
                </a> -->
                <!-- <a href="https://www.npmjs.com/package/gaea-cli" class="btn">
                    NPM
                </a> -->
                <!-- <router-link to="/detail" class="btn btn-start">
                    起步
                </router-link> -->
  
                <router-link to="" class="btn btn-start" @click.native="clkTag">
                    开始
                </router-link>
            </p>
            <!-- <nut-button 
                type="primary" 
                shape="circle" 
                small
                >
                查询
            </nut-button> -->
            <nut-picker 
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
            </nut-picker>
            <div class="jdc-logo"><s></s></div>
        </div>
    </div>
</template>

<script>
import { Picker, TextInput } from "@nutui/nutui";
export default {
    components: {
        "nut-picker": Picker,
        "nut-textinput": TextInput,
    },
    data() {
        return {
            spread: [1, 2, 3, 4],
            obj: {
                name: "wangnan",
                age: "30"
            },
            selectProvice: '',
            selectType: '',
            inputS: '560',
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
            T_defaultValueData: null
        };
    },
    created() {
        this.listData = [...[this.listData[0]], this.data[this.listData[0][0]] ];
        this.modifyYear()
        this.selectType = '理科'
        this.selectProvice = '华北-河北'
        this.inputS = '180~699分数'
        // this.selectType = [...[this.T_listData[0]]];
        // this.T_listData = [...[this.T_listData[0]], this.data[this.T_listData[0][0]] ];
    },
    mounted() {
    },
    destroyed() {},
    methods: {
        clkTag(){
            if (Number.isNaN(Number(this.inputS))) {
                this.inputS = '600'
            } 
            this.$router.push({ path: '/detail3', query: {
                province: this.selectProvice, 
                local_type: this.selectType, 
                score: this.inputS}});
            
        },
        switchPicker(param) {
            this[`${param}`] = !this[`${param}`];
        },

        setChooseValue(chooseData) {
            this.selectProvice = `${chooseData[0]}-${chooseData[1]}${chooseData[2] ? '-' + chooseData[2] : ''}`;
        },

        setYearValue(chooseData) {
            this.selectType = `${chooseData[0]}`;
        },

        updateLinkage(self, value, index, chooseValue, cacheValueData) {
            if (!value) {
                return false;
            }
            switch(index) {
                case 1: 
                    // console.log('GGGGGGGGGGGGG')
                    // console.log('137:::' + value)
                    let i = this.listData[0].indexOf(value);
                    this.listData.splice(index, 1, [...this.data[this.listData[0][i]]]);
                    chooseValue = chooseValue ? chooseValue : this.listData[index][0];
                    self && self.updateChooseValue(self, index, chooseValue);
                    this.updateLinkage(self, chooseValue, 2, (cacheValueData && cacheValueData[2] ? cacheValueData[2] : null));
                    // this.selectProvice = chooseValue;
                    console.log('TTT' + this.selectProvice)
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
.p {
    margin: 200px;
}
</style>
