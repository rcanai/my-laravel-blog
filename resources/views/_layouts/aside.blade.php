<aside id="aside">
  <div class="aside-title">
    @lang('route.categories')
  </div>
  <ul class="aside-list">
    @foreach($categories as $category)
      <li>
        <a href="{{route('archives', ['category' => $category->id])}}">
          {{$category->name}}
        </a>
      </li>
    @endforeach
  </ul>
</aside>
