<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "scroll",
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            //监听滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
                //监听了scroll事件
                if (this.listenScroll) {
                    let _that = this;
                    //派发emit scroll事件
                    this.scroll.on('scroll', (pos) => {
                        _that.$emit('scroll', pos);
                    })
                }
                console.log('初始化')
            },
            refresh() {
                console.log('测试');
                this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll.arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            }
        },
        watch: {
            data() {
                console.log('data')
                setTimeout(() => {
                    this.refresh();
                }, 400)
            }
        }
    }
</script>

<style scoped>

</style>
