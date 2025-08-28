// js/views/BlogPost.js
const { ref, computed } = Vue;

export const BlogPost = {
    template: `
        <div class="blog-post" v-if="post">
            <div class="module">
                <h1 class="page-title">{{ post.title }}</h1>
                <p class="blog-meta" style="text-align:center; margin-bottom: 30px; font-size: 1.1rem;">📅 {{ post.date }} | ✍️ {{ post.author }}</p>
                <img :src="post.image" :alt="post.title" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 30px;">
                
                <div class="blog-post-content" v-html="post.fullContent"></div>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                    <h3>标签:</h3>
                    <div class="blog-tags">
                        <span class="tag" v-for="(tag, i) in post.tags" :key="i">{{ tag }}</span>
                    </div>
                </div>
            </div>
            
            <div class="module">
                <h3>相关文章</h3>
                <div class="blog-list">
                    <div class="blog-card" v-for="(relatedPost, index) in relatedPosts" :key="index">
                         <img :src="relatedPost.image" :alt="relatedPost.title" class="blog-image">
                        <div class="blog-content">
                            <h3><router-link :to="'/blog/' + relatedPost.id">{{ relatedPost.title }}</router-link></h3>
                            <p class="blog-meta">📅 {{ relatedPost.date }}</p>
                            <p>{{ relatedPost.description.substring(0, 100) }}...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="module">
            <p style="text-align:center; padding: 50px 0; font-size: 1.2rem;">文章未找到。</p>
        </div>
        `,
    props: ['id'], // 接收路由参数 id
    setup(props) {
        // 模拟通过 ID 获取文章的逻辑
        const posts = [
            {
                id: 1,
                title: '深入浅出 WebAssembly：下一代 Web 性能革命',
                image: 'https://img.alicdn.com/imgextra/i3/O1CN01y3jD2d1DZq0lX1ZJG_!!6000000000241-2-tps-1232-928.png',
                date: '2024年10月28日',
                author: '博主',
                tags: ['WebAssembly', '性能优化', '前端'],
                fullContent: `
                        <p>WebAssembly (Wasm) 正在悄然改变 Web 开发的格局。它不再是遥不可及的前沿技术，而是解决实际性能瓶颈的利器。</p>
                        <h2>什么是 WebAssembly?</h2>
                        <p>WebAssembly 是一种二进制指令格式，它被设计为一种可移植的编译目标，可以在 Web 上以接近原生的性能运行。它不是一门编程语言，而更像是一个虚拟机的汇编语言。</p>
                        <h2>为什么需要 WebAssembly?</h2>
                        <p>JavaScript 虽然强大，但在处理计算密集型任务时，其性能往往不如编译型语言。Wasm 的出现，允许开发者使用 C/C++、Rust 等语言编写高性能模块，并将其编译为 Wasm 字节码，在浏览器中运行。这为游戏、视频编辑、CAD 软件等高性能 Web 应用打开了大门。</p>
                        <blockquote>Wasm 的核心价值在于“扩展 Web 平台的能力”。</blockquote>
                        <h2>Wasm 的工作原理</h2>
                        <ol>
                            <li><strong>编写代码</strong>: 使用支持的语言（如 Rust, C/C++）编写代码。</li>
                            <li><strong>编译</strong>: 使用工具链（如 Emscripten, wasm-pack）将源代码编译成 .wasm 文件。</li>
                            <li><strong>加载</strong>: 在 JavaScript 中通过 <code>WebAssembly.instantiate()</code> 或 <code>fetch()</code> API 加载 .wasm 模块。</li>
                            <li><strong>执行</strong>: 浏览器的 Wasm 虚拟机执行字节码，与 JavaScript 进行交互。</li>
                        </ol>
                        <p>Wasm 模块运行在一个沙箱环境中，与 JavaScript 环境是隔离的，但可以通过导入/导出函数、内存等方式进行数据交换。</p>
                        <h2>未来展望</h2>
                        <p>随着工具链的成熟和浏览器支持的完善，WebAssembly 将在更多领域发挥作用，例如边缘计算、物联网等。它与 JavaScript 并非替代关系，而是互补关系，共同构建更强大的 Web 生态。</p>
                    `,
                relatedIds: [2, 3] // 相关文章的 ID
            },
            {
                id: 2,
                title: '容器化技术演进：从 Docker 到 Kubernetes 生态',
                image: 'https://img.alicdn.com/imgextra/i1/O1CN01n5bYVC1LISOAf9gSM_!!6000000001276-2-tps-1232-928.png',
                date: '2024年10月22日',
                author: '博主',
                tags: ['Docker', 'Kubernetes', 'DevOps'],
                fullContent: `
                        <p>容器化技术是现代软件交付的基石。它简化了应用的打包、部署和运维，极大地提高了开发和运维效率。</p>
                        <h2>Docker: 容器化的起点</h2>
                        <p>Docker 的出现让容器技术走向大众。它通过镜像 (Image) 和容器 (Container) 的概念，实现了应用与运行环境的隔离。开发者可以将应用及其依赖打包成一个轻量级、可移植的镜像，确保应用在任何地方都能以相同的方式运行。</p>
                        <pre><code># Dockerfile 示例
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
                        </code></pre>
                        <h2>Kubernetes: 容器编排的王者</h2>
                        <p>当容器数量增多时，手动管理变得异常困难。Kubernetes (K8s) 应运而生，它是一个开源的容器编排平台，用于自动化容器化应用的部署、扩展和管理。</p>
                        <ul>
                            <li><strong>Pod</strong>: K8s 中最小的部署单元，可以包含一个或多个容器。</li>
                            <li><strong>Service</strong>: 定义了访问 Pod 的策略，提供服务发现和负载均衡。</li>
                            <li><strong>Deployment</strong>: 用于管理 Pod 的副本和更新。</li>
                        </ul>
                        <p>K8s 通过声明式配置，让开发者只需描述应用的期望状态，系统会自动完成调度和维护。</p>
                        <h2>云原生生态</h2>
                        <p>围绕 K8s，形成了庞大的云原生生态系统，包括 Helm (包管理)、Istio (服务网格)、Prometheus (监控) 等工具，共同支撑着现代分布式应用的开发与运维。</p>
                    `,
                relatedIds: [1, 4]
            },
            {
                id: 3,
                title: '设计思维：打造用户喜爱的产品体验',
                image: 'https://img.alicdn.com/imgextra/i2/O1CN01Fi9JNQ1e59aJxBRji_!!6000000003819-2-tps-1232-928.png',
                date: '2024年10月15日',
                author: '博主',
                tags: ['用户体验', '产品设计', '设计思维'],
                fullContent: `
                        <p>在竞争激烈的市场中，用户体验是产品成功的关键。设计思维提供了一种以人为本的创新方法。</p>
                        <h2>设计思维五步法</h2>
                        <ol>
                            <li><strong>共情 (Empathize)</strong>: 深入了解用户，观察、互动，感同身受。</li>
                            <li><strong>定义 (Define)</strong>: 明确用户的核心需求和待解决的问题。</li>
                            <li><strong>构思 (Ideate)</strong>: 头脑风暴，产生尽可能多的创意方案。</li>
                            <li><strong>原型 (Prototype)</strong>: 快速创建低成本的原型，将想法具象化。</li>
                            <li><strong>测试 (Test)</strong>: 将原型交给用户测试，收集反馈，迭代优化。</li>
                        </ol>
                        <p>这个过程是迭代和非线性的，需要不断循环往复。</p>
                        <h2>实践案例</h2>
                        <p>许多伟大的产品都源于对用户需求的深刻洞察。例如，Airbnb 早期通过亲自体验用户租房过程，发现了房东和房客之间的信任问题，并通过引入高质量照片和用户评价系统来解决。</p>
                        <h2>结语</h2>
                        <p>设计思维不仅仅适用于设计师，它是每个产品经理、工程师都应该掌握的思维方式。它帮助我们跳出技术的局限，从用户的角度出发，创造出真正有价值的产品。</p>
                    `,
                relatedIds: [1, 2]
            },
            {
                id: 4,
                title: '函数式编程的魅力：用代码诠释数学之美',
                image: 'https://img.alicdn.com/imgextra/i4/O1CN01hF9y8W1Gg9bDQ1QcK_!!6000000000659-2-tps-1232-928.png',
                date: '2024年10月05日',
                author: '博主',
                tags: ['函数式编程', 'JavaScript', 'Python'],
                fullContent: `
                        <p>函数式编程 (FP) 是一种强大的编程范式，它强调使用函数来构建软件。它让代码更加简洁、可预测和易于测试。</p>
                        <h2>核心概念</h2>
                        <ul>
                            <li><strong>纯函数 (Pure Functions)</strong>: 相同的输入总是产生相同的输出，且没有副作用。</li>
                            <li><strong>不可变性 (Immutability)</strong>: 数据一旦创建就不能被修改，任何“修改”操作都会返回新的数据。</li>
                            <li><strong>高阶函数 (Higher-Order Functions)</strong>: 函数可以作为参数传递给其他函数，或者作为函数的返回值。</li>
                            <li><strong>函数组合 (Function Composition)</strong>: 将多个简单函数组合成复杂的函数。</li>
                        </ul>
                        <h2>在主流语言中的应用</h2>
                        <p>即使是命令式语言如 JavaScript 和 Python，也支持函数式编程特性。</p>
                        <pre><code>// JavaScript 示例：使用 map, filter, reduce
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens); // [4, 8]
                        </code></pre>
                        <h2>优势与挑战</h2>
                        <p>FP 的优势在于提高了代码的可读性、可维护性和并发安全性。但其学习曲线可能较陡峭，尤其是在处理状态和副作用时。</p>
                        <p>现代 FP 语言如 Haskell、Clojure，以及支持 FP 的语言如 F#、Scala，都在探索如何更好地平衡表达力和实用性。</p>
                    `,
                relatedIds: [2, 3]
            }
        ];

        const post = computed(() => {
            const postId = Number(props.id);
            return posts.find(p => p.id === postId);
        });

        const relatedPosts = computed(() => {
            if (!post.value) return [];
            return post.value.relatedIds
                .map(id => posts.find(p => p.id === id))
                .filter(Boolean); // 过滤掉未找到的
        });

        return {
            post,
            relatedPosts
        };
    }
};
