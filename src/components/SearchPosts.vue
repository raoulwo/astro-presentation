<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');

// Computed property to filter posts reactively as the user types
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return props.posts;
  
  const query = searchQuery.value.toLowerCase();
  return props.posts.filter(post => 
    post.data.title.toLowerCase().includes(query) || 
    post.data.description.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div>
    <!-- Search Input Bar -->
    <div class="mb-6">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          🔍
        </span>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search articles by title or topic..."
          class="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>
      <p v-if="searchQuery && filteredPosts.length === 0" class="text-xs text-slate-400 mt-2 text-center">
        No articles found matching "{{ searchQuery }}"
      </p>
    </div>

    <!-- Filtered Posts List -->
    <div class="space-y-4">
      <article 
        v-for="post in filteredPosts" 
        :key="post.id"
        class="bg-white p-5 rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
          <h2 class="text-lg font-semibold">
            <a :href="`/blog/${post.id}`" class="text-slate-800 hover:text-emerald-600 transition-colors">
              {{ post.data.title }}
            </a>
          </h2>

          <time :datetime="post.data.publishDate" class="text-xs text-slate-400 font-medium">
            {{ new Date(post.data.publishDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            }) }}
          </time>
        </div>

        <p class="text-slate-600 text-sm leading-relaxed">{{ post.data.description }}</p>
      </article>
    </div>
  </div>
</template>