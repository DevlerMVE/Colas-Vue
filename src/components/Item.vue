<template>
    <div class="item container columns">
        <div class="column is-12">
            <div class="card" :class="[item.itemState,custom]">
                <div class="card-content">
                    <strong>{{item.name}}</strong>
                    <span class="info">Process time was {{item.time}} seconds</span>
                    <div class="progress__bar" :data-time="item.time">
                        <div class="progress__bar__content" :style="'transition-duration:'+item.time+'s'"
                             :class="{'progress': item.start}"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Componente que mostrará la información del proceso en ejecución e historico
     */

    export default {
        name: "Item",
        props: [
            'item',
            'custom'
        ],
    }
</script>

<style lang="scss">
    .item.columns {
        width: 100%;
        margin: 0;

        .historical {
            .progress__bar {
                display: none;
            }
            span.info {
                display: block;
            }
        }

        .card {
            border-radius: 5px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, .16);

            &.Ko {
                border-left: 5px solid hsl(348, 100%, 61%);
            }

            &.Ok {
                border-left: 5px solid hsl(141, 71%, 48%);
            }
        }
    }

    strong {
        font: {
            size: 20px;
        };
    }

    span {
        display: block;

        &.info {
            font: {
                size: 14px;
            }
            display: none;
            color: gray;
        }
    }

    .progress__bar {
        width: 100%;

        &__content {
            background-color: hsl(204, 86%, 53%);
            box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
            transition-property: width;
            width: 0;
            border: {
                radius: 6px;
            };
            height: 6px !important;

            .progress {
                width: 100%;
            }
        }
    }
</style>