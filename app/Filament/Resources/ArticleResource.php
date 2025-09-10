<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use App\Models\Category;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
// ✅ SUPPRIMÉ : use Illuminate\Database\Eloquent\Builder; (inutilisé)

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Articles';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Informations principales')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->label('Titre')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (string $context, $state, callable $set) {
                            if ($context === 'create') {
                                $set('slug', Str::slug($state));
                            }
                        }),

                    Forms\Components\TextInput::make('slug')
                        ->label('Slug (URL)')
                        ->required()
                        ->maxLength(255)
                        ->unique(Article::class, 'slug', ignoreRecord: true),

                    Forms\Components\Select::make('category_id')
                        ->label('Catégorie')
                        ->options(Category::where('type', 'article')->pluck('name', 'id'))
                        ->required(),

                    // ✅ CORRIGÉ : Auth::id() au lieu de auth()->id()
                    Forms\Components\Select::make('user_id')
                        ->label('Auteur')
                        ->options(User::pluck('name', 'id'))
                        ->required()
                        ->default(Auth::id()),
                ]),

            Forms\Components\Section::make('Contenu')
                ->schema([
                    Forms\Components\Textarea::make('excerpt')
                        ->label('Extrait')
                        ->rows(3)
                        ->maxLength(500),

                    Forms\Components\RichEditor::make('content')
                        ->label('Contenu')
                        ->required()
                        ->columnSpanFull(),
                ]),

            Forms\Components\Section::make('Publication')
                ->schema([
                    Forms\Components\FileUpload::make('image')
                        ->label('Image à la une')
                        ->image()
                        ->directory('articles')
                        ->maxSize(2048),

                    Forms\Components\Select::make('status')
                        ->label('Statut')
                        ->options([
                            'draft' => 'Brouillon',
                            'published' => 'Publié',
                        ])
                        ->required()
                        ->default('published'),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->label('Date de publication')
                        ->default(now()),

                    Forms\Components\Toggle::make('is_featured')
                        ->label('Article à la une')
                        ->default(false),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->size(60),

                Tables\Columns\TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('Catégorie')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Auteur')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'warning',
                    }),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('À la une')
                    ->boolean(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Publié le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}
