<header id="header">
  <div class="header-container">
    <div class="application-title">
      <a href="{{url('/')}}">
        My Laravel blog
      </a>
    </div>
    <nav class="header-nav">
      <ul>
        <li>
          <a href="{{url('/')}}">@lang('route.home')</a>
        </li>
        <li>
          <a href="{{url('posts')}}">@lang('route.posts')</a>
        </li>
        <li>
          <a href="{{url('accounts')}}">@lang('route.accounts')</a>
        </li>
        <li>
          <a href="{{url('logout')}}">@lang('route.logout')</a>
        </li>
        <li class="dummy"></li>
      </ul>
    </nav>
  </div>
</header>
