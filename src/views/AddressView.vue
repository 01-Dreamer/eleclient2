<template>
    <HeaderBase>
        地址管理
    </HeaderBase>

    <div class="address-container">
        
        <div class="section-header">我的店铺</div>
        <div class="address-card shop-card">
            <div class="card-content">
                <div class="main-address-text">{{ shop_address.address }}</div>
            </div>
            <div class="card-action" @click="handleEditShop">
                <el-icon :size="18" color="#999"><EditPen /></el-icon>
            </div>
        </div>

        <div class="section-header">我的位置</div>
        <div class="address-list">
            <div 
                v-for="(item, index) in my_addresses" 
                :key="item.id" 
                class="address-item"
                :class="{ 'is-selected': selected_address_id === item.id }"
                @click="handleSelectAddress(item.id)"
            >
                <div class="item-body">
                    <div class="address-row">
                        <span class="location-text">{{ item.address }}</span>
                    </div>
                    <div class="user-row">
                        <span class="user-name">{{ item.nickname }}</span>
                    </div>
                </div>
                
                <div class="item-actions">
                    <div v-if="selected_address_id === item.id" class="check-mark">
                        <el-icon :size="20" color="#409eff"><Select /></el-icon>
                    </div>
                    <div class="icon-btn" @click.stop="handleEditUserAddress(item.id)">
                        <el-icon :size="18"><EditPen /></el-icon>
                    </div>
                    <div class="icon-btn delete" @click.stop="handleDeleteUserAddress(item.id)">
                        <el-icon :size="18"><Delete /></el-icon>
                    </div>
                </div>
            </div>
        </div>

        <div class="add-address-row">
            <el-button class="add-btn" round size="large" @click="handleAddAddress">
                <el-icon style="margin-right: 4px"><Plus /></el-icon> 新增地址
            </el-button>
        </div>

        <el-dialog
            v-model="dialog_visible"
            :title="is_editing_shop ? '修改店铺地址' : '修改地址'"
            width="90%"
            align-center
            destroy-on-close
            class="simple-dialog"
        >
            <el-form label-position="top">
                <el-form-item label="详细地址">
                    <el-input 
                        v-model="edit_form.address" 
                        placeholder="请输入完整地址" 
                        type="textarea" 
                        :rows="3"
                        resize="none"
                    ></el-input>
                </el-form-item>
                
                <el-form-item label="昵称" v-if="!is_editing_shop">
                    <el-input v-model="edit_form.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
            </el-form>
            
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialog_visible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirmEdit">确认</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { reactive, ref } from 'vue';
import { EditPen, Delete, Plus, Select } from '@element-plus/icons-vue';

const selected_address_id = ref(101);
const dialog_visible = ref(false);
const is_editing_shop = ref(false);
const current_editing_id = ref<number | null>(null);

const edit_form = reactive({
    address: '',
    nickname: ''
});

const shop_address = reactive({
    address: '丰台区莲花池东路118号北京西站F1',
});

const my_addresses = reactive([
    {
        id: 101,
        address: '北京市海淀区北京大学48号楼302室',
        nickname: '王同学'
    },
    {
        id: 102,
        address: '北京市海淀区海淀大街38号腾讯大厦',
        nickname: '王先生'
    },
    {
        id: 103,
        address: '北京市朝阳区万科星园12号楼2单元501',
        nickname: '小王'
    }
]);

const handleSelectAddress = (id: number) => {
    selected_address_id.value = id;
};

const handleEditShop = () => {
    is_editing_shop.value = true;
    current_editing_id.value = null;
    
    edit_form.address = shop_address.address;
    edit_form.nickname = ''; 
    
    dialog_visible.value = true;
};

const handleEditUserAddress = (id: number) => {
    is_editing_shop.value = false;
    current_editing_id.value = id;
    
    const target = my_addresses.find(item => item.id === id);
    if (target) {
        edit_form.address = target.address;
        edit_form.nickname = target.nickname;
    }
    
    dialog_visible.value = true;
};

const handleConfirmEdit = () => {
    if (is_editing_shop.value) {
        console.log('shop_address_update:', edit_form.address);
    } else {
        console.log('user_address_id:', current_editing_id.value);
        console.log('new_info:', {
            address: edit_form.address,
            nickname: edit_form.nickname
        });
    }
    
    dialog_visible.value = false;
};

const handleDeleteUserAddress = (id: number) => console.log("delete_id", id);
const handleAddAddress = () => console.log("add_address_clicked");
</script>

<style scoped>
.address-container {
    padding-top: 14vw;
    padding-bottom: 80px; 
    background-color: #f7f8fa;
    min-height: 100vh;
    box-sizing: border-box;
}

.section-header {
    font-size: 13px;
    color: #909399;
    padding: 15px 15px 8px;
}

.address-card.shop-card {
    background: #fff;
    margin: 0 12px;
    padding: 20px 15px; 
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.card-content {
    flex: 1;
    margin-right: 10px;
}

.main-address-text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
    word-break: break-all; 
}

.address-list {
    margin: 0 12px; 
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.address-item {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    transition: all 0.2s ease;
    cursor: pointer;
}

.address-item.is-selected {
    border-color: #409eff;
    background-color: #f0f9ff;
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
}

.item-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-right: 10px;
}

.location-text {
    font-size: 15px;
    color: #333;
    font-weight: 500;
    line-height: 1.4;
    word-break: break-all;
}

.user-row {
    font-size: 13px;
    color: #666;
}

.item-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.check-mark {
    margin-right: 4px;
    display: flex;
    align-items: center;
}

.icon-btn {
    padding: 6px;
    color: #a8abb2;
}

.add-address-row {
    margin: 20px 12px 0;
    display: flex;
    justify-content: center;
}

.add-btn {
    width: 100%;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-color: #fff;
    color: #409eff;
    border: 1px dashed #409eff;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
}
</style>