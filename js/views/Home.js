// js/views/Home.js
const { ref, computed } = Vue;

export const Home = {
    template: `
        <div class="home">
          <div class="hero-section">
            <h1>欢迎来到我的数字花园 🌿</h1>
            <p>在这里，我记录技术探索、生活感悟与创意火花。</p>
          </div>

          <div class="content-section">

            <!-- 我的笔记模块 -->
            <div class="module">
              <h2>我的笔记</h2>
              <div class="notes-container">
                <div class="note-card" v-for="(note, index) in notes" :key="index">
                  <h3>{{ note.title }}</h3>
                  <p>📅 {{ note.date }}</p>
                </div>
              </div>
            </div>

            <!-- 最近的博客模块 -->
            <div class="module">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>最近博客</h2>
                <router-link to="/blog" class="btn">查看全部文章</router-link>
              </div>
              <div class="blog-list">
                <div class="blog-card" v-for="(blog, index) in recentBlogs" :key="index">
                  <img :src="blog.image" :alt="blog.title" class="blog-image">
                  <div class="blog-content">
                    <h3><router-link :to="'/blog/' + blog.id">{{ blog.title }}</router-link></h3>
                    <p class="blog-meta">📅 {{ blog.date }} | ✍️ {{ blog.author }}</p>
                    <p>{{ blog.description.substring(0, 200) }}...</p>
                    <div class="blog-tags">
                      <span class="tag" v-for="(tag, i) in blog.tags" :key="i">{{ tag }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
    setup() {
        // 模拟笔记数据
        const notes = ref([
            { title: 'Vue 3 Composition API 最佳实践', date: '2024年10月25日' },
            { title: '微服务架构下的数据一致性', date: '2024年10月20日' },
            { title: '摄影中的黄金分割构图', date: '2024年10月15日' }
        ]);

        // 模拟博客数据
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
            }
        ]);

        // 计算属性：获取最近的两篇博客
        const recentBlogs = computed(() => blogs.value.slice(0, 2));

        return {
            notes,
            blogs,
            recentBlogs
        };
    }
};
