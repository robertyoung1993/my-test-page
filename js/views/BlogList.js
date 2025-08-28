// js/views/BlogList.js
const { ref, computed } = Vue;

export const BlogList = {
    template: `
        <div class="blog">
          <h1 class="page-title">全部博客</h1>
          <div class="module">
             <div class="search-bar">
                <input type="text" v-model="searchQuery" placeholder="搜索文章标题或标签..." />
                <button @click="performSearch">搜索</button>
            </div>
            <div class="blog-list">
              <div class="blog-card" v-for="(blog, index) in filteredBlogs" :key="index">
                <img :src="blog.image" :alt="blog.title" class="blog-image">
                <div class="blog-content">
                  <h3><router-link :to="'/blog/' + blog.id">{{ blog.title }}</router-link></h3>
                  <p class="blog-meta">📅 {{ blog.date }} | ✍️ {{ blog.author }}</p>
                  <p>{{ blog.description.substring(0, 250) }}...</p>
                  <div class="blog-tags">
                    <span class="tag" v-for="(tag, i) in blog.tags" :key="i">{{ tag }}</span>
                  </div>
                </div>
              </div>
               <p v-if="filteredBlogs.length === 0" style="text-align:center; padding: 40px 0; color: #7f8c8d;">没有找到匹配的文章。</p>
            </div>
          </div>
        </div>
      `,
    setup() {
        const blogs = ref([
            {
                id: 1,
                title: '深入浅出 WebAssembly：下一代 Web 性能革命',
                image: 'https://img.alicdn.com/imgextra/i3/O1CN01y3jD2d1DZq0lX1ZJG_!!6000000000241-2-tps-1232-928.png',
                description: 'WebAssembly (Wasm) 是一种低级类汇编语言，具有紧凑的二进制格式，可以以接近原生的性能在 Web 上运行。它为 C/C++、Rust 等语言提供了一条通往浏览器的高速公路，极大地扩展了 Web 平台的能力。本文将探讨 Wasm 的核心概念、工作原理以及它如何重塑 Web 应用的性能边界。',
                date: '2024年10月28日',
                author: '博主',
                tags: ['WebAssembly', '性能优化', '前端']
            },
            {
                title: '容器化技术演进：从 Docker 到 Kubernetes 生态',
                image: 'https://img.alicdn.com/imgextra/i1/O1CN01n5bYVC1LISOAf9gSM_!!6000000001276-2-tps-1232-928.png',
                id: 2,
                description: '容器技术已经成为现代云原生应用部署的事实标准。Docker 作为先驱简化了应用打包，而 Kubernetes 则提供了强大的编排能力。本文将回顾容器技术的发展历程，分析 Docker 的核心优势，并深入探讨 Kubernetes 的架构、核心概念（如 Pod、Service、Deployment）以及它如何解决大规模容器化应用的管理难题。',
                date: '2024年10月22日',
                author: '博主',
                tags: ['Docker', 'Kubernetes', 'DevOps']
            },
            {
                title: '设计思维：打造用户喜爱的产品体验',
                image: 'https://img.alicdn.com/imgextra/i2/O1CN01Fi9JNQ1e59aJxBRji_!!6000000003819-2-tps-1232-928.png',
                id: 3,
                description: '优秀的产品设计不仅仅是美观的界面，更是对用户需求的深刻理解和满足。设计思维 (Design Thinking) 提供了一套以人为本的创新方法论。本文将介绍设计思维的五个阶段：共情、定义、构思、原型和测试，并结合实际案例，探讨如何运用这套方法论来发现用户痛点，构思解决方案，并打造出真正有价值的产品体验。',
                date: '2024年10月15日',
                author: '博主',
                tags: ['用户体验', '产品设计', '设计思维']
            },
            {
                title: '函数式编程的魅力：用代码诠释数学之美',
                image: 'https://img.alicdn.com/imgextra/i4/O1CN01hF9y8W1Gg9bDQ1QcK_!!6000000000659-2-tps-1232-928.png',
                id: 4,
                description: '函数式编程 (FP) 是一种编程范式，它将计算视为数学函数的求值，并避免了改变状态和可变数据。它强调不可变性、纯函数和函数组合。本文将介绍函数式编程的核心概念，如高阶函数、闭包、柯里化等，并探讨它在提高代码可读性、可维护性和并发安全性方面的优势，以及在 JavaScript、Python 等主流语言中的应用。',
                date: '2024年10月05日',
                author: '博主',
                tags: ['函数式编程', 'JavaScript', 'Python']
            }
        ]);

        const searchQuery = ref('');

        const filteredBlogs = computed(() => {
            if (!searchQuery.value.trim()) {
                return blogs.value;
            }
            const query = searchQuery.value.toLowerCase();
            return blogs.value.filter(blog =>
                blog.title.toLowerCase().includes(query) ||
                blog.tags.some(tag => tag.toLowerCase().includes(query))
            );
        });

        const performSearch = () => {
            // 搜索逻辑已在 computed 属性中处理，这里可以留空或添加其他交互
            console.log("Performing search for:", searchQuery.value);
        };

        return {
            blogs,
            searchQuery,
            filteredBlogs,
            performSearch
        };
    }
};
