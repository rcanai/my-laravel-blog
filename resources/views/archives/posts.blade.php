<ul class="post-list">
  @foreach($posts as $post)
    <li class="post-list-item">
      <h2>
        <a href="{{url('archives', $post->id)}}" class="post-title">{{ $post->title }}</a>
      </h2>
      <time datetime="{{$post->published_at}}">{{$post->published_at->format('Y/m/d H:i')}}</time>
      <div class="post-images">
        @foreach($post->images as $image)
          <img src="{{$image->url}}" alt="IMAGE">
        @endforeach
      </div>
      <div class="post-content">
        {{ $post->content }}
      </div>
      <a href="{{url('archives', $post->id)}}" class="read-post">@lang('label.read_post')</a>
    </li>
  @endforeach
</ul>
