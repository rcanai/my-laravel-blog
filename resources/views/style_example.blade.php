@extends('admin.master')

@section('title')
@lang('label.style_example') |&nbsp;
@endsection

@section('styles')
<style>
  #style-example {
    padding: 1rem;
  }
  #style-example button,
  #style-example section {
    margin-bottom: 0.5rem;
  }
  section > h1 {
    font-weight: bold;
  }
  #bd p,
  #bd div {
    border: 1px solid #000000;
  }
</style>
@endsection
@section('content')
<section id="style-example">
  <section>
    <h1>1. Typography</h1>
    <div>
      <h1>Example h1</h1>
      <h2>Example h2</h2>
      <h3>Example h3</h3>
      <h4>Example h4</h4>
      <h5>Example h5</h5>
      <h6>Example h6</h6>
    </div>
    <div>
      <a href="#">link</a>
    </div>
    <ul>
      <li>ul-list-item</li>
      <li>ul-list-item</li>
      <li>ul-list-item</li>
    </ul>
    <ol>
      <li>ol-list-item</li>
      <li>ol-list-item</li>
      <li>ol-list-item</li>
    </ol>
  </section>
  <hr>
  <section>
    <h1>2. Form</h1>
    <form action="#">
      <label>label</label>
      <br>
      <input type="text" name="input" value="" placeholder="">
      <input type="text" name="input" value="input" placeholder="">
      <input type="text" name="input" value="" placeholder="input">
      <br>
      <select name="select">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <br>
      <textarea>textarea</textarea>
      <br>
      <label>
        <input type="radio" name="radio" value="1">radio</label>
      <label>
        <input type="radio" name="radio" value="2">radio</label>
      <label>
        <input type="radio" name="radio" value="3" checked>radio</label>
      <br>
      <label>
        <input type="checkbox" name="checkbox" value="1">checkbox</label>
      <label>
        <input type="checkbox" name="checkbox" value="2">checkbox</label>
      <label>
        <input type="checkbox" name="checkbox" value="3" checked>checkbox</label>
      <br>
      <button type="button">button</button>
      <button type="submit">submit</button>
    </form>
  </section>
  <hr>
  <section>
    <h1>3. Utility</h1>
    <div>
      <h2>3-1. Text</h2>
      <p class="text-light">text-light
        <span class="text-dark">oops! bg == color</span>
      </p>
      <p class="text-dark">text-dark</p>
      <p class="text-gray">text-gray</p>
      <p class="text-primary">text-primary</p>
      <p class="text-secondary">text-secondary</p>
      <p class="text-tertiary">text-tertiary</p>
      <p class="text-success">text-success</p>
      <p class="text-info">text-info</p>
      <p class="text-warning">text-warning</p>
      <p class="text-danger">text-danger</p>
      <p>&nbsp;</p>
      <p class="font-bold">font-bold</p>
      <p class="font-normal">font-normal</p>
      <p>&nbsp;</p>
      <p class="text-center">text-center</p>
      <p class="text-left">text-left</p>
      <p class="text-right">text-right</p>
    </div>
    <div>
      <h2>3-2. Link</h2>
      <a href="#" class="text-light">text-light
        <span class="text-dark">oops! bg == color</span>
      </a>
      <br>
      <a href="#" class="text-dark">text-dark</a>
      <br>
      <a href="#" class="text-gray">text-gray</a>
      <br>
      <a href="#" class="text-primary">text-primary</a>
      <br>
      <a href="#" class="text-secondary">text-secondary</a>
      <br>
      <a href="#" class="text-tertiary">text-tertiary</a>
      <br>
      <a href="#" class="text-success">text-success</a>
      <br>
      <a href="#" class="text-info">text-info</a>
      <br>
      <a href="#" class="text-warning">text-warning</a>
      <br>
      <a href="#" class="text-danger">text-danger</a>
      <br>
    </div>
    <div style="clear:both;">
      <h2>3-3. Display</h2>
      <p class="d--hidden">d-hidden oops! class="d-hidden"</p>
      <p class="d-inline-block">d-inline-block</p>
      <p class="d-block">d-block</p>
      <p class="d-inline ">d-inline</p>
    </div>
    <div>
      <h2>3-4. Background color</h2>
      <div class="bg-light">bg-light</div>
      <div class="bg-dark">bg-dark</div>
      <div class="bg-gray">bg-gray</div>
      <div class="bg-primary">bg-primary</div>
      <div class="bg-secondary">bg-secondary</div>
      <div class="bg-tertiary">bg-tertiary</div>
      <div class="bg-success">bg-success</div>
      <div class="bg-info">bg-info</div>
      <div class="bg-warning">bg-warning</div>
      <div class="bg-danger">bg-danger</div>
    </div>
    <div>
      <h2>3-5. Button</h2>
      <button class="button-light">button-light</button>
      <button class="button-dark">button-dark</button>
      <button class="button-gray">button-gray</button>
      <br>
      <button class="button-primary">button-primary</button>
      <button class="button-secondary">button-secondary</button>
      <button class="button-tertiary">button-tertiary</button>
      <br>
      <button class="button-success">button-success</button>
      <button class="button-info">button-info</button>
      <button class="button-warning">button-warning</button>
      <button class="button-danger">button-danger</button>
      <div>&nbsp;</div>
      <button class="button-primary button-large">button-large</button>
      <button class="button-primary">button-primary</button>
      <button class="button-primary button-small">button-small</button>
    </div>
    <div id="bd">
      <h2>3-6. Padding</h2>
      <p class="p-0">p-0</p>
      <p class="p-05">p-05</p>
      <p class="p-1">p-1</p>
      <p class="p-2">p-2</p>
      <p class="p-3">p-3</p>
      <p class="pl-0">pl-0</p>
      <p class="pl-05">pl-05</p>
      <p class="pl-1">pl-1</p>
      <p class="pl-2">pl-2</p>
      <p class="pl-3">pl-3</p>
      <div class="font-bold" style="border:none;">
        Other... <br>
        pt-XX = padding-top;<br>
        pr-XX = padding-right;<br>
        pb-XX = padding-bottom;<br>
      </div>
    </div>
    <div id="bd">
      <h2>3-7. Margin</h2>
      <p class="m-0">m-0</p>
      <p class="m-05">m-05</p>
      <p class="m-1">m-1</p>
      <p class="m-2">m-2</p>
      <p class="m-3">m-3</p>
      <p class="ml-0">ml-0</p>
      <p class="ml-05">ml-05</p>
      <p class="ml-1">ml-1</p>
      <p class="ml-2">ml-2</p>
      <p class="ml-3">ml-3</p>
      <div class="font-bold" style="border:none;">
        Other... <br>
        mt-XX = margin-top;<br>
        mr-XX = margin-right;<br>
        mb-XX = margin-bottom;<br>
      </div>
    </div>
    <div>
      <h2>3-8. Cursor</h2>
      <div class="c-default">c-default</div>
      <div class="c-move">c-move</div>
      <div class="c-pointer">c-pointer</div>
      <div class="c-not">c-not</div>
      <div class="c-none">c-none</div>
    </div>
    <div id="bd">
      <h2>3-9. Width</h2>
      <div class="w-full">w-full</div>
      <div class="w-half">w-half</div>
      <div class="w-quarter">w-quarter</div>
    </div>
  </section>
  <hr>
  <section>
    <h1>Framework #1</h1>
    <div>
      <h2>Custom radio</h2>
      <label class="custom-radio">
        <input type="radio" name="custom-radio">
        <span></span>Radio
      </label>
      <label class="custom-radio">
        <input type="radio" name="custom-radio" checked>
        <span></span>Radio
      </label>
      <label class="custom-radio">
        <input type="radio" name="custom-radio" disabled>
        <span></span>Radio
      </label>
    </div>
    <div>
      <h2>Custom checkbox</h2>
      <label class="custom-checkbox">
        <input type="checkbox" name="custom-checkbox">
        <span></span>Checkbox
      </label>
      <label class="custom-checkbox">
        <input type="checkbox" name="custom-checkbox" checked>
        <span></span>Checkbox
      </label>
      <label class="custom-checkbox">
        <input type="checkbox" name="custom-checkbox" disabled>
        <span></span>Checkbox
      </label>
    </div>
  </section>
  <section>
    <h1>Framework #2</h1>
    <div>
      <h2>Tab</h2>
      <div class="tab">
        <ul class="tab-head">
          <li class="tab-head-item is-active">
            <p>Item1</p>
          </li>
           <li class="tab-head-item">
            <p>Item2</p>
          </li>
          <li class="tab-head-item">
            <p>Item3</p>
          </li>
        </ul>
        <div class="tab-body">
          <p>Tab body</p>
          <p>Tab body</p>
          <p>Tab body...</p>
        </div>
      </div>
    </div>
  </section>

</section>
@endsection @section('scripts')
<script>
  new Vue({
    el: '#app'
  });

</script>
@endsection
