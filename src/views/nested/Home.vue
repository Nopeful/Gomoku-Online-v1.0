<template>
    <div>
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="item in pics" :key="item">
                <el-image :src="item" fit="fill"></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: [''],
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                pics: [require('../../assets/img/carousel-1.jpg'), require('../../assets/img/carousel-2.png'), require('../../assets/img/carousel-3.png')]
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-image {
        width: 400px;
        height: 300px;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>