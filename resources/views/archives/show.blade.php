@extends('_layouts.master')

@section('title')
{{$post->title}} |&nbsp;
@endsection

@section('styles')
{{--  --}}
@endsection

@section('content')
<article class="single-post">
  <header>
    <h1>{{$post->title}}</h1>
    <time datetime="{{$post->updated_at}}">{{$post->updated_at->format('Y/m/d H:i:s')}}</time>
  </header>
  <section class="single-post-content">
    {!! $post->content_html !!}
  </section>
  <footer>
    <div class="footer-title">@lang('label.comments')</div>
    <ul class="single-post-comment-list">
      @foreach($post->comments as $comment)
        <li class="single-post-comment-list-item">
          <div class="comment-meta">
            <span class="comment-author">{{$comment->author}}</span>
            <time datetime="{{$comment->updated_at}}">{{$comment->updated_at->format('Y/m/d H:i:s')}}</time>
          </div>
          <div class="comment-content">
            {{$comment->content}}
          </div>
        </li>
      @endforeach
    </ul>
  </footer>
</article>
<div>
  @if (count($errors) > 0)
    <ul class="form-errors">
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  @endif
  <form action="{{url('comment')}}" method="POST">
    @method('post')
    @csrf
    <input type="hidden" name="post_id" value="{{$post->id}}">
    <div>
      <label for="comment-author"></label>
      <input type="text" id="comment-author" name="author" value="{{request()->old('author')}}" required>
    </div>
    <div>
      <label for="comment-content"></label>
      <textarea id="comment-content" name="content" rows="5">{{request()->old('content')}}</textarea>
    </div>
    <div>
      <button type="submit">@lang('label.send')</button>
    </div>
  </form>
</div>
<a href="{{url('archives')}}">@lang('記事一覧へ')</a>
@endsection

@section('scripts')
<script src="@assetTimestamp(js/archives/show.js)" defer></script>
@endsection
