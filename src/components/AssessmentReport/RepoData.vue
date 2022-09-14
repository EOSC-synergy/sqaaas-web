<template>

  <div class="container-fluid m-0 p-0">

    <div class="row repo_data">
      <div class="col-auto text-center" style="min-width: 100px;">

        <img :src='repo.avatar_url' width="90px">

      </div>
      <div class="col">
        <div class="row">
          <div class="col repo_data_name">

            <a :href='repo.url' target="_blank" style="font-size: 28px; font-weight: bold;"> {{ this.$store.state.report.repository[0].name }} </a>

          </div>
        </div>

        <div class="row">
          <div class="col repo_data_description mb-2">

            {{ repo.description }}

          </div>
        </div>

        <div class="row">
          <div class="col-auto repo_data_version mb-2">

            <svg height="16" width="16" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"></path>
            </svg>
            {{ repo.tag }}

          </div>

          <div class="col-auto repo_data_languages mb-2">
            <svg viewBox="0 0 24 24" height="16" width="16">
              <path d="M7 18H17V16H7V18Z" fill="currentColor"></path><path d="M17 14H7V12H17V14Z" fill="currentColor"></path>
              <path d="M7 10H11V8H7V10Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor"></path>
            </svg>
            <!-- {{ this.$store.state.report.repository[0].language }}-->
            <span v-for="language in repo.languages">
              <span class="repo_data_language"> {{ language }}</span>
            </span>

          </div>

          <div class="col-auto repo_data_topics mb-2">
            <span class="repo_data_topic" v-for="topic in repo.topics">
              <a :href="'https://github.com/topics/' + topic" target="_blank">{{ topic }}</a>
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-auto repo_data_watchers mb-2">

            <svg  height="16" width="16" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            Watch: {{ repo.watchers_count }}

          </div>

          <div class="col-auto repo_data_forks mb-2">

            <svg height="16" width="16" viewBox="0 0 16 16" >
              <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
            </svg>
            Fork: {{ repo.forks_count }}

          </div>

          <div class="col-auto repo_data_stars mb-2">
            <svg  height="16" width="16" viewBox="0 0 16 16" >
              <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
            </svg>
            Star: {{ repo.stargazers_count }}
          </div>
        </div>


      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "RepoData",
  props: ['repo']
}
</script>

<style scoped>

.repo_data{}
.repo_data_name{}
.repo_data_name a:hover{
  color: #4a639a;
}
.repo_data_version,
.repo_data_watchers,
.repo_data_forks,
.repo_data_stars{
  padding-right: 0.5rem;
}
.repo_data_languages{
  padding-right: 0;
}
.repo_data_language{
  padding-right: 0.4rem;
}
.repo_data_topics{}
.repo_data_topic{
  margin-left: 0.2rem;
  display: inline-block;
  padding: 0 7px;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 2em;
  line-height: 22px;
  color: #58a6ff;
  background-color: rgba(56,139,253,0.15);
}
.repo_data_topic a{
  font-weight: bold;
}
.repo_data_topic a:hover{
  color: #22386b;
}
</style>
