'use client';

import HeaderSection from '../components/headerSection';
import FooterSection from '../components/footerSection';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { useState } from 'react';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

  const filteredPosts =
    selectedTag === 'all' ? blogPosts : blogPosts.filter((post) => post.tags.includes(selectedTag));

  return (
    <div className="flex min-h-screen flex-col bg-black font-mono">
      <HeaderSection />
      <main className="flex-1 px-6 py-4">
        {/* Hero Section */}
        <section className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 text-white">
          <h1 className="text-5xl font-bold md:text-7xl">BLOG</h1>
          <div className="flex space-x-2">
            <Link href="/">
              <span className="hover:underline">Home</span>
            </Link>
            <span>/</span>
            <span>Blog</span>
          </div>
          <p className="max-w-2xl text-center text-gray-400">
            Thoughts, tutorials, and insights about web development
          </p>
        </section>

        {/* Tag Filter */}
        <section className="mx-auto mb-8 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedTag('all')}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                selectedTag === 'all'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="mx-auto max-w-4xl space-y-8 pb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-transform hover:scale-[1.02]"
            >
              <div className="p-6 md:p-8">
                {/* Post Header */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  {post.featured && (
                    <>
                      <span>•</span>
                      <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                        Featured
                      </span>
                    </>
                  )}
                </div>

                {/* Post Title */}
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">{post.title}</h2>

                {/* Post Excerpt */}
                <p className="mb-4 text-gray-400">{post.excerpt}</p>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded bg-gray-800 px-3 py-1 text-xs text-gray-300">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-block text-sm font-medium text-white transition-colors hover:text-gray-300"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p>No blog posts found with this tag.</p>
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Blog;
