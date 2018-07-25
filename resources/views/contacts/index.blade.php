@extends('_layouts.master')

@section('title')
@lang('route.contacts') |&nbsp;
@endsection

@section('styles')
{{-- <link href="@assetTimestamp(css/contacts.css)" rel="stylesheet"> --}}
@endsection

@section('content')
<div>
  <h1>@lang('route.contacts')</h1>
  @if (count($errors) > 0)
    <ul class="form-errors">
      @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
      @endforeach
    </ul>
  @endif
  <form action="{{url('contacts/confirm')}}" method="POST">
    @method('post')
    @csrf
    <div>
      <label for="contact-name">@lang('label.name')</label>
      <input type="text" id="contact-name" name="name" value="{{request()->old('name')}}" required>
    </div>
    <div>
      <label for="contact-email">@lang('label.email')</label>
      <input type="email" id="contact-email" name="email" value="{{request()->old('email')}}" required>
    </div>
    <div>
      <label for="contact-content">@lang('label.content')</label>
      <textarea id="contact-content" name="content" rows="5">{{request()->old('content')}}</textarea>
    </div>
    <div>
      <button type="submit">@lang('label.confirm')</button>
    </div>
  </form>
</div>
@endsection

@section('scripts')
{{--  --}}
@endsection
