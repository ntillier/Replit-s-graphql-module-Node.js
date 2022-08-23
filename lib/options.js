export default {
  Repl: {
    operationName: 'ReplView',
    queryName: 'repl',
    required: [['url'], ['id']],
    options: ['id', 'title', 'timeCreated', 'imageUrl', 'timeUpdated', 'url', 'publicForkCount', 'imageUrl', 'iconUrl', 'commentCount', 'description', { name: 'owner', type: 'User' }, { name: 'tags', type: 'Tag' }, 'publicReleasesForkCount', 'publishedAs', { name: 'deployment', type: 'ReplDeployment' }, 'iconUrl', 'templateReview', 'likeCount', 'commentCount', 'runCount', 'prodUrl', 'isProject', 'nextPagePathname', 'previewUrl', 'wasPosted', 'wasPublished', 'replViewSettings', 'language', 'slug', 'flagOwnerDotReplitPackager', 'origin', { name: 'templateInfo', type: 'ReplTemplateInfo' }, { name: 'relatedRepls', type: 'RelatedReplsGroup' }, { name: 'config', type: 'ReplConfig' }, { name: 'source', type: 'ReplSource' }, 'commentSettings', /*{ name: 'comments', type: 'ReplViewComments', search: true }*/]
  },
  User: {
    operationName: 'UserCard',
    queryName: 'userByUsername',
    required: [['id'], ['username'], ['url']],
    options: ['id', 'image', 'username', 'url', 'followerCount', 'fullName', 'followCount', 'hasPrivacyRole', 'isLoggedIn', 'bio', 'isHacker']
  },
  Tag: {
    operationName: null,
    options: ['id']
  },
  ReplViewComments: {
    options: [{ name: 'pageInfo', type: 'PageInfo' }, { name: 'items', type: 'ReplComment'}],
    required: [['id'], ['count', 'after']]
  },
  Language: {
    options: ['id', 'displayName', 'header', 'canUseShellRunner', 'hasReplboxWebview']
  },
  RelatedReplsGroup: {
    options: ['name', { name: 'repls', type: 'repl' }]
  },
  ReplTemplateInfo: {
    options: ['iconUrl']
  },
  ReplConfig: {
    options: ['isServer', 'isVnc']
  },
  ReplSource: {
    options: [{ name: 'release', type: 'ReplRelease' }, { name: 'deployment', type: 'ReplDeployment' }]
  },
  ReplRelease: {
    options: ['id']
  },
  ReplDeployment: {
    options: ['id', { name: 'repl', type: 'repl' }]
  },
  PageInfo: {
    options: ['nextCursor']
  },
  ReplComment: {
    options: ['id', 'body', 'timeCreated', 'isHidden']
  }
}