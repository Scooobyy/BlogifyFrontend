import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

const dummyBlogs = [
    {
        _id: "dummy1",
        title: "The Beauty of Simple Living",
        description: "Explore how minimalism can bring peace and clarity to our fast-paced lives.",
        image: "/images/simple_living.jpg",
        content: `
In a world dominated by consumerism and constant technological distractions, the concept of simple living offers a refreshing alternative that promotes peace, clarity, and a deep sense of fulfillment. Simple living, often associated with minimalism, encourages individuals to strip away the excess clutter—both physical and mental—and focus on what truly matters: relationships, health, meaningful experiences, and personal growth.

At its core, simple living is about intentionality. It challenges the pervasive cultural notion that happiness stems from acquiring more possessions, wealth, or status. Instead, it suggests that true contentment arises from appreciating what we already have and fostering a mindful connection to our daily lives. This can manifest as decluttering one's home, reducing consumption, simplifying schedules, or cultivating gratitude for small joys.

The benefits of adopting a simple lifestyle are multifaceted. Physically, decluttering living spaces can reduce stress and create environments that nurture calmness and creativity. Psychologically, focusing on essentials promotes mindfulness and helps combat anxiety caused by the relentless demands of modern life. Financially, spending less and prioritizing needs over wants leads to better budgeting, reduced debt, and greater freedom. Environmentally, consuming less reduces waste, conserves resources, and minimizes one’s ecological footprint.

Minimalism does not mean deprivation or asceticism; rather, it is about making conscious choices aligned with personal values. For some, this might mean downsizing a home to reduce maintenance and expenses; for others, it could be adopting a capsule wardrobe or limiting digital screen time. Embracing simple living often leads to improved relationships, as more time and energy become available to connect authentically with family and friends.

Furthermore, simple living can be a form of resistance against the consumer culture that encourages endless accumulation. It reminds us that our worth is not tied to material possessions but to who we are as people. Movements like the tiny house trend, zero-waste lifestyle, and slow living philosophy all share roots in the principle of simplicity.

Adopting this lifestyle requires reflection and courage, especially in societies that equate success with material wealth. However, many who embrace simplicity report increased happiness, less stress, and a greater sense of purpose. Simple living invites us to reclaim our time, cultivate joy in everyday moments, and live with greater authenticity.

In practice, this might look like cooking meals from scratch, enjoying nature walks, prioritizing quality over quantity in purchases, or fostering hobbies that bring joy without excessive expense. It encourages regular digital detoxes to reduce information overload and enhance presence.

Ultimately, simple living is a personal journey with no one-size-fits-all formula. It calls for mindfulness, self-awareness, and the willingness to let go of societal pressures. By embracing simplicity, we create space—both literally and figuratively—for a richer, more meaningful life focused on what truly nourishes the soul. In a fast-paced world, this beauty of simplicity offers a timeless path to peace, clarity, and fulfillment.
`
    },
    {
        _id: "dummy2",
        title: "Electric Cars: The Road Ahead",
        description: "A look at how electric vehicles are transforming the auto industry.",
        image: "/images/electric_car.jpg",
        content: `
Electric vehicles (EVs) represent one of the most significant technological shifts in the automotive industry in recent decades. As concerns about climate change, air pollution, and the finite nature of fossil fuels grow, electric cars offer a promising solution for a cleaner, more sustainable future.

Unlike traditional internal combustion engine vehicles, EVs use electric motors powered by rechargeable batteries. This fundamental difference translates into zero tailpipe emissions, reduced noise pollution, and the potential for improved energy efficiency. Advances in battery technology, particularly lithium-ion batteries, have drastically increased the driving range of EVs while reducing costs, making them increasingly competitive with gasoline-powered cars.

The global adoption of electric vehicles is accelerating, driven by government incentives, stricter emission regulations, and growing consumer awareness. Countries such as Norway, China, and the Netherlands lead the way in EV market share, while traditional automakers have committed billions of dollars to electrification strategies. Many manufacturers plan to phase out internal combustion engines entirely in favor of electric or hybrid models within the next decade.

Despite the progress, challenges remain. The environmental impact of battery production and disposal requires attention, alongside the need for widespread charging infrastructure. Fast-charging stations, wireless charging, and home chargers are rapidly expanding, but accessibility and convenience are still barriers for some users. The electricity grid itself must evolve to support the increased demand from EVs, incorporating renewable energy sources to maximize environmental benefits.

Electric cars are also redefining automotive design and user experience. The simplicity of electric motors allows for innovative layouts and more interior space. Many EVs incorporate advanced driver-assistance systems, connectivity features, and over-the-air software updates, blurring the line between vehicles and high-tech gadgets.

Beyond personal cars, electric propulsion is transforming public transportation, commercial fleets, and even aviation and maritime sectors. Electric buses, trucks, and delivery vans reduce emissions in urban centers, contributing to healthier environments.

The road ahead for electric vehicles looks promising but requires continued innovation, investment, and collaboration among governments, industries, and consumers. As battery technology improves, costs decrease, and infrastructure expands, EVs are poised to become the dominant mode of transportation, ushering in a new era of mobility that is cleaner, smarter, and more sustainable.
`
    },
    {
        _id: "dummy3",
        title: "AI in 2030: What Can We Expect?",
        description: "Predicting how Artificial Intelligence will shape society in the next decade.",
        image: "/images/ai_future.jpg",
        content: `
Artificial Intelligence (AI) has already begun transforming numerous facets of modern life, and by 2030, its influence will be even more profound and far-reaching. From healthcare to transportation, education to entertainment, AI technologies will continue to reshape how we live, work, and interact.

By 2030, AI systems will likely possess vastly improved capabilities in natural language understanding, image and video recognition, and autonomous decision-making. These advances will enable AI to take on complex tasks with greater accuracy, efficiency, and contextual awareness.

In healthcare, AI will assist doctors in diagnostics, personalized treatment plans, and early disease detection. Machine learning algorithms will analyze vast datasets, from genomic sequences to medical imaging, uncovering patterns that humans might miss. AI-powered robotic surgery will become more precise, reducing recovery times and improving patient outcomes.

The transportation sector will witness widespread deployment of autonomous vehicles, including cars, trucks, and drones. AI will manage traffic flows, optimize routes, and enhance safety by anticipating hazards and reacting faster than human drivers. Smart cities equipped with AI-driven infrastructure will improve energy use, waste management, and emergency response.

Education will become more personalized and accessible through AI tutors that adapt to each student’s learning pace and style. AI will help identify knowledge gaps and tailor content accordingly, making lifelong learning a practical reality for all. Additionally, virtual and augmented reality powered by AI will create immersive educational experiences.

Workplaces will be transformed as AI automates repetitive tasks, freeing humans for creative and strategic roles. Collaborative robots (cobots) will work alongside employees in manufacturing, logistics, and offices. While some jobs may become obsolete, new roles focused on AI oversight, ethics, and development will emerge.

Ethical considerations will be paramount as AI systems become more autonomous and influential. Issues around bias, privacy, and accountability will demand robust governance frameworks. Society will need to balance innovation with safeguards to ensure AI benefits everyone fairly.

Entertainment and creativity will flourish with AI-generated content, from music and art to games and storytelling. AI will act as collaborators, augmenting human creativity rather than replacing it.

Overall, AI in 2030 will offer incredible opportunities and challenges. Its integration into daily life promises to enhance quality of life, solve complex problems, and open new frontiers. However, responsible development, ethical use, and inclusive policies will be essential to navigate the transformative impact of AI on society.
`
    },
    {
        _id: "dummy4",
        title: "The Rise and Fall of the Maratha Empire",
        description: "A brief journey through one of India’s greatest powers.",
        image: "/images/maratha_empire.jpg",
        content: "The Marathas, once a dominant force in 18th-century India, played a crucial role in shaping the subcontinent's history. Originating as a warrior clan in the Deccan region, they rose to prominence under the leadership of Shivaji Maharaj, who established a strong, decentralized kingdom based on guerrilla warfare and administrative reforms. The Maratha Empire expanded rapidly, challenging Mughal dominance and resisting foreign invasions. Their military strategies and political alliances enabled them to control vast territories across central and western India. However, internal conflicts, succession disputes, and pressures from rising British power gradually weakened the empire. The Anglo-Maratha Wars marked the decline, culminating in the eventual absorption of Maratha territories into British India. Despite their fall, the Marathas left a lasting legacy of valor, governance, and cultural pride, influencing regional identities and nationalist movements in modern India."
    },
    {
        _id: "dummy5",
        title: "How to Stay Productive Without Burning Out",
        description: "Balance is key to long-term creativity and success.",
        image: "/images/productivity.jpg",
        content: "Productivity is not about doing more—it's about doing what matters most effectively and sustainably. In today's always-on culture, the risk of burnout is high, making it essential to find a balance between work and rest. Effective productivity strategies include setting clear goals, prioritizing tasks, and breaking work into manageable chunks to maintain focus without overwhelm. Regular breaks, exercise, and mindfulness practices help recharge mental and physical energy. Learning to say no and setting boundaries protects time for personal life and self-care. Technology can aid productivity but also distract, so using tools mindfully is crucial. Cultivating habits such as planning your day, reflecting on accomplishments, and adjusting workflows promotes continuous improvement. Ultimately, sustainable productivity supports creativity, motivation, and overall well-being, enabling long-term success without sacrificing health or happiness."
    },
    {
        _id: "dummy6",
        title: "Top 5 Affordable Sports Cars in 2025",
        description: "Fast, furious, and surprisingly budget-friendly.",
        image: "/images/sports_cars.jpg",
        content: "The thrill of driving a sports car is no longer reserved for those with deep pockets. In 2025, several affordable sports cars deliver exhilarating performance, stylish design, and cutting-edge features at accessible prices. Models like the Toyota GR86 and Mazda MX-5 Miata stand out for their perfect balance of agility, power, and driving enjoyment. The GR86 offers a responsive flat-four engine and sharp handling, making it a favorite among enthusiasts seeking a pure driving experience. Meanwhile, the MX-5 Miata is celebrated for its lightweight chassis and open-top freedom. Other contenders in this category include the Ford Mustang EcoBoost, Subaru BRZ, and Hyundai Veloster N, each bringing unique strengths such as turbocharged power, advanced tech, or aggressive styling. These cars prove that fun and affordability can go hand in hand, making the dream of owning a sports car achievable for many drivers."
    },
    {
        _id: "dummy7",
        title: "India’s Space Journey: From PSLV to Gaganyaan",
        description: "ISRO’s remarkable transformation over the decades.",
        image: "/images/isro.jpg",
        content: "India's space agency, ISRO, has grown from humble beginnings into a global powerhouse of innovation and exploration. Starting with the successful launch of the Polar Satellite Launch Vehicle (PSLV), ISRO demonstrated its capability to deploy satellites accurately and cost-effectively. This vehicle became the workhorse for numerous missions, including international satellite launches that earned India a spot on the world space stage. Building on this success, ISRO embarked on ambitious projects like the Chandrayaan lunar missions and the Mars Orbiter Mission, both milestones in planetary exploration achieved on modest budgets. Now, ISRO is preparing for Gaganyaan—the country’s first crewed spaceflight—marking a historic step in human spaceflight. This mission symbolizes India’s growing technological expertise and its commitment to advancing scientific knowledge. ISRO’s journey reflects determination, innovation, and the spirit of discovery, inspiring future generations of scientists and engineers."
    },
    {
        _id: "dummy8",
        title: "The Ethics of Brain-Computer Interfaces",
        description: "Merging mind and machine: How far is too far?",
        image: "/images/brain_tech.jpg",
        content: "Companies like Neuralink are developing technology that bridges the gap between the human brain and computers, promising revolutionary applications in medicine, communication, and beyond. Brain-computer interfaces (BCIs) could restore mobility for paralysis patients, enhance cognitive abilities, or enable direct thought communication. However, these advances raise profound ethical questions. How do we protect mental privacy when thoughts could potentially be read or influenced? What are the risks of hacking or misuse of neural data? Issues of consent, autonomy, and long-term impacts on identity and society need careful consideration. The technology could exacerbate social inequalities if access is limited to the wealthy. Regulators, ethicists, and scientists must work together to create frameworks that balance innovation with respect for human dignity and rights. As we move closer to merging mind and machine, ongoing dialogue is essential to ensure these technologies benefit all of humanity without compromising fundamental ethical principles."
    },
    {
        _id: "dummy9",
        title: "Rediscovering Ancient Indian Science",
        description: "Vedic contributions to math, astronomy, and medicine.",
        image: "/images/vedic_science.jpg",
        content: "Ancient India was a hub of scientific progress, with contributions spanning mathematics, astronomy, medicine, and metallurgy. The Vedic period laid foundations with concepts like zero and the decimal system, which revolutionized mathematics and were later adopted worldwide. Scholars like Aryabhata made significant advances in understanding planetary motions and eclipses, formulating accurate astronomical calculations centuries ahead of their time. Ayurveda, an ancient system of medicine, emphasized holistic health and natural remedies, many principles of which continue to influence modern healthcare. Texts like the Sushruta Samhita detailed surgical techniques and instrumentation, showcasing advanced medical knowledge. Rediscovering and appreciating this heritage highlights India’s rich intellectual history and its enduring impact on global science and culture. Modern research often draws inspiration from these ancient insights to innovate solutions for contemporary challenges."
    },
    {
        _id: "dummy10",
        title: "Life Lessons from the Mountains",
        description: "What the Himalayas taught me about resilience and peace.",
        image: "/images/himalayas.jpg",
        content: "A personal reflection on trekking in the Himalayas reveals powerful lessons about resilience, patience, and inner peace. The mountains teach us to respect nature’s grandeur and unpredictability while reminding us of our own limits and strengths. Facing steep trails, unpredictable weather, and physical exhaustion, one learns to pace oneself, stay focused, and remain calm in adversity. The silence and vastness invite deep introspection and mindfulness, allowing worries and distractions to fall away. Communities living in the mountains embody simplicity and harmony, offering inspiration on living with less yet finding contentment. The experience fosters humility and gratitude, encouraging a slower, more intentional approach to life. These lessons transcend trekking, reminding us to face life’s challenges with courage, embrace the present moment, and find peace within ourselves amidst external chaos."
    }, {
        _id: "dummy11",
        title: "Life Lessons from the Mountains",
        description: "What the Himalayas taught me about resilience and peace.",
        image: "/images/himalayas.jpg",
        content: "A personal reflection on trekking in the Himalayas reveals powerful lessons about resilience, patience, and inner peace. The mountains teach us to respect nature’s grandeur and unpredictability while reminding us of our own limits and strengths. Facing steep trails, unpredictable weather, and physical exhaustion, one learns to pace oneself, stay focused, and remain calm in adversity. The silence and vastness invite deep introspection and mindfulness, allowing worries and distractions to fall away. Communities living in the mountains embody simplicity and harmony, offering inspiration on living with less yet finding contentment. The experience fosters humility and gratitude, encouraging a slower, more intentional approach to life. These lessons transcend trekking, reminding us to face life’s challenges with courage, embrace the present moment, and find peace within ourselves amidst external chaos."
    }, {
        _id: "dummy12",
        title: "Life Lessons from the Mountains",
        description: "What the Himalayas taught me about resilience and peace.",
        image: "/images/himalayas.jpg",
        content: "A personal reflection on trekking in the Himalayas reveals powerful lessons about resilience, patience, and inner peace. The mountains teach us to respect nature’s grandeur and unpredictability while reminding us of our own limits and strengths. Facing steep trails, unpredictable weather, and physical exhaustion, one learns to pace oneself, stay focused, and remain calm in adversity. The silence and vastness invite deep introspection and mindfulness, allowing worries and distractions to fall away. Communities living in the mountains embody simplicity and harmony, offering inspiration on living with less yet finding contentment. The experience fosters humility and gratitude, encouraging a slower, more intentional approach to life. These lessons transcend trekking, reminding us to face life’s challenges with courage, embrace the present moment, and find peace within ourselves amidst external chaos."
    },
];

export const BlogProvider = ({ children }) => {
    const { authToken } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = useCallback(async () => {
        try {
            console.log('Fetching blogs with auth-token:', authToken);
            const res = await axios.get('https://blogifybackend-ti05.onrender.com/api/blogs/myposts', {
                headers: {
                    'auth-token': authToken,
                },
            });
            console.log('Blogs fetched:', res.data);
            if (res.data.length === 0) {
                setBlogs(res.data); // Use dummy if no real blogs
            } else {
                setBlogs(res.data);
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setBlogs([]); // Use dummy on error (e.g., token expired or server down)
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken) {
            fetchBlogs();
        } else {
            setBlogs([]); // No token → guest user → show dummy blogs
            setLoading(false);
        }
    }, [authToken, fetchBlogs]);



    const getPublishedBlogs = () => {
        const published = blogs.filter(blog => blog.status === 'published');

        // Show dummy blogs if none are published
        if (published.length === 0) {
            return dummyBlogs;
        }

        return published;
    };

    const getBlogById = (id) => {
  return blogs.find(blog => blog._id === id) || dummyBlogs.find(blog => blog._id === id);
};
    const createBlog = async (blogData) => {
        try {
            const res = await axios.post('https://blogifybackend-ti05.onrender.com/api/blogs/save', blogData, {
                headers: {
                    'auth-token': authToken,
                },
            });
            console.log('Blog created:', res.data);
            setBlogs(prev => [...prev, res.data]);
            return { success: true, data: res.data };
        } catch (err) {
            console.error('Error creating blog:', err);
            return { success: false, error: err.response?.data?.error || 'Failed to create blog' };
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`https://blogifybackend-ti05.onrender.com/api/blogs/delete/${id}`, {
                headers: {
                    'auth-token': authToken,
                },
            });
            console.log('Blog deleted:', id);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
            return { success: true };
        } catch (err) {
            console.error('Error deleting blog:', err);
            return { success: false, error: err.response?.data?.error || 'Failed to delete blog' };
        }
    };

    const publishBlog = async (id) => {
        try {
            const res = await axios.put(`https://blogifybackend-ti05.onrender.com/api/blogs/publish/${id}`, {}, {
                headers: {
                    'auth-token': authToken,
                },
            });
            console.log('Blog published:', res.data);
            setBlogs(prevBlogs =>
                prevBlogs.map(blog =>
                    blog._id === id ? { ...blog, status: 'published' } : blog
                )
            );
            return { success: true, data: res.data };
        } catch (err) {
            console.error('Error publishing blog:', err);
            return { success: false, error: err.response?.data?.error || 'Failed to publish blog' };
        }
    };

    const unpublishBlog = async (id) => {
        try {
            const res = await axios.put(`https://blogifybackend-ti05.onrender.com/api/blogs/unpublish/${id}`, {}, {
                headers: {
                    'auth-token': authToken,
                },
            });
            console.log('Blog unpublished:', res.data);
            setBlogs(prevBlogs =>
                prevBlogs.map(blog =>
                    blog._id === id ? { ...blog, status: 'draft' } : blog
                )
            );
            return { success: true, data: res.data };
        } catch (err) {
            console.error('Error unpublishing blog:', err);
            return { success: false, error: err.response?.data?.error || 'Failed to unpublish blog' };
        }
    };
    // inside BlogContext.js (or wherever your context logic is)

const editBlog = async (id, title, content, status = undefined) => {
  try {
    const body = { title, content };
    if (status) body.status = status;

    const res = await fetch(`https://blogifybackend-ti05.onrender.com/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Include your auth token here if needed
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || 'Update failed' };
    }

    const updatedBlog = await res.json();

    // Update blog list in context state
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog._id === id ? updatedBlog : blog))
    );

    return { success: true, blog: updatedBlog };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


const fetchBlogById = async (id) => {
  try {
    // First, check locally (both real and dummy blogs)
    const allBlogs = [...blogs, ...dummyBlogs];
    const found = allBlogs.find(blog => blog._id === id);
    if (found) {
      return { success: true, data: found };
    }

    // Else try to fetch from backend (in case not in state)
    const res = await axios.get(`https://blogifybackend-ti05.onrender.com/api/blogs/${id}`, {
      headers: { 'auth-token': authToken },
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Error fetching blog by id:', error);
    return { success: false, error: error.response?.data?.error || 'Blog not found' };
  }
};


const autoSaveBlogDraft = async (blogData, existingId = null) => {
  try {
    let res;
    if (existingId) {
      // Edit if already saved
      res = await axios.put(`https://blogifybackend-ti05.onrender.com/api/blogs/${existingId}`, blogData, {
        headers: {
          'auth-token': authToken,
        },
      });
    } else {
      // Create new draft
      res = await axios.post('https://blogifybackend-ti05.onrender.com/api/blogs/save', blogData, {
        headers: {
          'auth-token': authToken,
        },
      });
    }

    const updated = res.data;
    setBlogs(prev =>
      existingId
        ? prev.map(blog => (blog._id === existingId ? updated : blog))
        : [...prev, updated]
    );
    return { success: true, data: updated };
  } catch (err) {
    console.error('Auto-save error:', err);
    return { success: false, error: err.response?.data?.error || 'Auto-save failed' };
  }
};

    return (
        <BlogContext.Provider
            value={{
                blogs,
                    autoSaveBlogDraft, 
                editBlog,
                getPublishedBlogs,
                getBlogById,
                loading,
                createBlog,
                deleteBlog,
                publishBlog,
                unpublishBlog,
                fetchBlogById,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};
