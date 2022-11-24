<template>
    <div ref="backgroundCover" v-show="visible" class="el-dialog__wrapper popup__middle overflow-hidden popup-bg" style="z-index: 2">
        <div ref="popupElement" class="popup__main m-0 col-4 p-0 popup-border-radius">
            <div class="el-dialog__header border-bottom">
                <slot name="header"></slot>
                <h3 class="text-center" v-if="!!title">{{ title }}</h3>
                <button v-if="hasClose" @click="$emit('on-close')" type="button" class="el-dialog__headerbtn">
                    <i class="el-dialog__close el-icon el-icon-close font-weight-bold"></i>
                </button>
            </div>
            <div class="popup__body pl-4 pt-3 pb-3 pr-4">
                <slot name="body"></slot>
            </div>
            <div class="p-3 border-top">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            hasClose: {
                type: Boolean,
                default: false
            },
            hasClickOutSide: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            onClose: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                isDisplay: true,
            }
        },
        methods: {
            hidden() {
                this.visible = false
            },
            handleOutsideClick(e) {
                if (this.hasClickOutSide && this.$refs.backgroundCover.contains(e.target) && !(this.$refs.popupElement === e.target || this.$refs.popupElement.contains(e.target))) {
                    document.removeEventListener('click', this.handleOutsideClick)
                    this.$emit('on-click-out-side')
                }
            }
        },
        mounted() {
            if (this.hasClickOutSide && this.visible) {
                document.addEventListener('click', this.handleOutsideClick)
            }
        },
        destroyed() {
            document.removeEventListener('click', this.handleOutsideClick)
        },
        watch: {
            visible: function (newVal) {
                if(newVal && this.hasClickOutSide ) {
                    document.addEventListener('click', this.handleOutsideClick)
                }
            }
        }
    }
</script>

<style scoped>

    .popup__middle ::v-deep .popup__main {
        margin: 0 !important;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }
    .popup-bg {
        background-color: rgba(10, 10, 10, 0.86);
    }
    .popup__body {
        color: #606266;
        word-break: break-all;
        max-height: calc(100vh - 192px);
        overflow: auto;
    }
    .popup-border-radius {
        border-radius: 8px;
    }
    .popup__main {
        position: relative;
        box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        box-sizing: border-box;
        background: #FFF;
    }
    .overflow-hidden {
        overflow: hidden;
    }

</style>