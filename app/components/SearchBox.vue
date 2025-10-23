<template>
  <div :class="classObject">
    <div class="wrap">
      <div class="content">
        <input 
          ref="input"
          type="search" 
          v-model="searchModel"
          :placeholder="$t('search.placeholder')"
          autocomplete="off"
          autocorrect="off"
          @focus="onInputFocus"
          @blur="onInputBlur"
          @keyup="onChangeSearchInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSiteStore } from '~/stores/site.js'

// Props
const props = defineProps({
  searchInput: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:searchInput'])

// Composables
const router = useRouter()
const store = useSiteStore()

// Template refs
const input = ref(null)

// Reactive state
const searchModel = ref(props.searchInput || '')
const searchHasFocus = ref(false)

// Computed properties
const searchResults = computed(() => store.searchresults)

const classObject = computed(() => {
  const classes = ['search-box']

  if (searchHasFocus.value) {
    classes.push('--active')
  }

  return classes.join(' ')
})

// Methods
const onChangeSearchInput = (event) => {
  if (event.key === 'Enter') {
    router.push('/search?q=' + encodeURIComponent(searchModel.value))
  }
}

const onInputFocus = () => {
  searchHasFocus.value = true
}

const onInputBlur = () => {
  searchHasFocus.value = false
}
</script>

<style lang="scss" scoped>

@use '@/assets/css/variables.scss' as variables;
@use '@/assets/css/mixins.scss' as mixins;
@use '@/assets/css/animations.scss' as animations;

.search-box {
	> .wrap {
		> .content {
			position: relative;
			border-radius: 100px;
			border: 1px solid rgba(var(--frontRGB), 0.2);
			border-color: rgba(var(--frontRGB), 0.2);
			transition: all 250ms animations.$ease;
			// box-shadow: 0 15px 30px -10px rgba(var(--front), 0.15);
			// color: rgba(var(--front), 0.15);

			input {
				display: block;
				background-color: transparent;
				border-radius: 100px;
				color: rgba(var(--frontRGB), 1);
				transition: all 250ms animations.$ease;
				border-width: 0;
				// box-shadow: 0 15px 30px -10px rgba(var(--front-r), var(--front-g), var(--front-b), 0.15);

				&::placeholder {
					color: rgba(var(--frontRGB), 1);
					opacity: 0.25;
					text-align: center;
				}
			}

			&:hover {
				border-color: rgba(var(--blueRGB), 0.5);
			}
		}
	}

	&.--active {
		> .wrap {
			> .content {
				border-color: rgba(var(--blueRGB), 0.5);
				box-shadow: 0 15px 30px -10px;
				color: rgba(var(--frontRGB), 0.15);

				input {
					// box-shadow: 0 15px 30px -10px rgba(var(--front-r), var(--front-g), var(--front-b), 0.15);
				}
			}
		}
	}

	@include mixins.media-query(medium-down) {
		> .wrap {
			> .content {
				input {
					font-size: 20px;
					line-height: 36px;
					height: 36px;
					padding: 0 15px 0 15px;
					width: 100%;
					box-sizing: border-box;
				}


			}
		}
	}

	@include mixins.media-query(large) {
		> .wrap {
			> .content {
				input {
					width: 400px;
					font-size: 20px;
					height: 37px;
					padding: 0 20px 3px 20px;
				}
			}
		}
	}
}

</style>