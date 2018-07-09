<aside>
  <ul>
    @foreach($categories as $category)
      <li>
        <a href="{{url('archives')}}">
          {{$category->name}}
        </a>
      </li>
    @endforeach
  </ul>
</aside>
