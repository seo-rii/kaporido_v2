import {publish} from 'gh-pages';

publish(
    'build',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/seo-rii/kaporido_v2.git',
        user: {
            name: 'seo-rii',
            email: 'me@seorii.page'
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);