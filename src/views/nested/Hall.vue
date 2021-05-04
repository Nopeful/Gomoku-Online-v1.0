<template>
    <el-row>
        <el-col :span="5">
            <PlayerTable roomId="hall"/>
            <Dialog roomId="hall"/>
        </el-col>
        <el-col :span="14">
            <RoomTable/>
        </el-col>
        <el-col :span="5">
            <PlayerDetails/>
        </el-col>
    </el-row>
</template>

<script>
    import PlayerTable from '../../components/PlayerTable';
    import Dialog from "../../components/Dialog";
    import PlayerDetails from "../../components/Profile";
    import RoomTable from "../../components/RoomTable";

    export default {
        name: "Hall",
        components: {RoomTable, PlayerDetails, Dialog, PlayerTable},

    }
</script>

<style scoped>
</style>