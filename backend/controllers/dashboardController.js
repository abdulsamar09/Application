exports.getDashboardData = async (req, res) => {
  try {
    const userName = req.user ? req.user.firstName : 'Jacob Smith';
    
    res.json({
      user: {
        name: userName,
        location: 'Florida, US'
      },
      reflection: {
        label: 'DAILY REFLECTION',
        quote: '"You don\'t have to control your thoughts. You just have to stop letting them control you."',
        readTime: '5 min read'
      },
      quickActions: [
        {
          id: '1',
          title: "Athlete's Edge",
          description: 'Performance pressures &\nprofessional transitions',
          iconName: 'Group 34712.png'
        },
        {
          id: '2',
          title: 'Mental Wellness',
          description: 'Anxiety, situational stress &\ndaily regulation',
          iconName: 'Group 34712 (1).png'
        },
        {
          id: '3',
          title: 'Financial Peace',
          description: 'Asset security management\n& wealth anxieties',
          iconName: 'Group 34712 (2).png'
        },
        {
          id: '4',
          title: 'Family & Peers',
          description: 'Relational support\necosystems & team dynamics',
          iconName: 'Group 34712 (3).png'
        }
      ],
      coaches: [
        {
          id: '1',
          name: 'Michael Jennings',
          role: 'Pro Mind Strategist',
          quote: '“Mental strength is the\nreal game.”',
          author: 'Rashad Evans',
          imageName: 'Rectangle 36.png'
        },
        {
          id: '2',
          name: 'Rachel Gray',
          role: 'Mindset Coach',
          quote: '“Protect your inner\nfocus.”',
          author: 'Jacqueline Jackson',
          imageName: 'Rectangle 37.png'
        },
        {
          id: '3',
          name: 'Marcus Cole',
          role: 'Performance Advisor',
          quote: '“Resilience wins\nmatches.”',
          author: 'Jason Jackson',
          imageName: 'Rectangle 37 (2).png'
        }
      ],
      resources: [
        {
          id: '1',
          title: '5-Minute Breathwork',
          type: 'Audio Module',
          iconName: 'headphone.png'
        },
        {
          id: '2',
          title: 'Managing Overwhelms',
          type: 'Deep Analysis',
          iconName: 'document-text.png'
        }
      ]
    });
  } catch (err) {
    console.error('Dashboard Data Error:', err);
    res.status(500).json({ message: 'Server error retrieving dashboard data' });
  }
};
