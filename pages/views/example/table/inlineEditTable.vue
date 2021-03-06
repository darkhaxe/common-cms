<template>
    <div class="app-container calendar-list-container">

        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="序号" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="时间">
                <template slot-scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="作者">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-table-column width="100px" label="重要性">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon"
                              :key="n"></svg-icon>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="状态" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="标题">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
                    <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="编辑" width="120">
                <template slot-scope="scope">
                    <el-button :type="scope.row.edit?'success':'primary'" @click='scope.row.edit=!scope.row.edit'
                               size="small" icon="edit">{{scope.row.edit ? '完成' : '编辑'}}
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    import {fetchList} from '~/pages/api/article'

    export default {
        name: 'inlineEditTable',
        data() {
            return {
                list: null,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 10
                }
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                };
                return statusMap[status]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    const items = response.data.items;
                    this.list = items.map(v => {
                        this.$set(v, 'edit', false);
                        return v
                    });
                    this.listLoading = false
                })
            }
        }
    }
</script>
